import { randomUUID as genId } from 'crypto'
import { streamText } from 'ai'
import dayjs from 'dayjs'

import { getProvider } from './provider'

import type { Provider, ProviderKey } from '@fst/llm'
import type { CallSettings, ModelMessage, Prompt, StreamTextOnFinishCallback, ToolSet } from 'ai'
import type { EventEmitter } from 'events'
import type { ArgsInit, Conversation } from './types'

export default class Index {
	id = ''
	event = null as unknown as EventEmitter
	options = {} as Conversation.Options
	provider = null as unknown as Provider

	messages = [] as Array<Conversation.Message>
	current = ''
	streamed = false

	abort_controller = new AbortController()

	read = null as unknown as ArgsInit['read']
	write = null as unknown as ArgsInit['write']

	async init(args: ArgsInit) {
		const { id, event, read, write } = args

		this.id = id
		this.event = event
		this.read = read
		this.write = write

		const { loading } = await read({ module: 'file_index', filename: id })
		const { options, messages } = await read({ module: 'chat', filename: id })
		const providers = await read({ module: 'global', filename: 'providers' })

		event.emit(`${this.id}/CHANGE`, { type: 'sync_options', options: options } as Conversation.EventRes)

		this.options = options
		this.messages = messages || []
		this.provider = providers[options.model.provider].config as Provider

		let state = '' as 'sync' | 'sync_hide_loading' | 'ask'

		if (loading) {
			if (this.streamed) {
				state = 'sync'
			} else {
				state = 'sync_hide_loading'
			}
		} else {
			if (messages?.length > 1) {
				state = 'sync'
			} else {
				if (this.options.type === 'chat') {
					state = 'ask'
				}
			}
		}

		switch (state) {
			case 'sync':
				event.emit(`${this.id}/CHANGE`, {
					type: 'sync',
					messages: this.messages,
					current: this.current
				} as Conversation.EventRes)
				break
			case 'sync_hide_loading':
				this.setLoading(false)

				event.emit(`${this.id}/CHANGE`, {
					type: 'sync',
					messages: this.messages
				} as Conversation.EventRes)
				break
			case 'ask':
				this.ask(this.options.question)
				this.streaming()
				break
		}
	}

	async ask(question: string) {
		const message = {
			id: genId(),
			role: 'user',
			timestamp: dayjs().valueOf(),
			items: [{ role: 'user', content: question }]
		} as Conversation.Message

		this.messages.push(message)

		this.event.emit(`${this.id}/CHANGE`, { type: 'ask', message } as Conversation.EventRes)

		this.persist()
	}

	async updateOptions() {
		const { options } = await this.read({ module: 'chat', filename: this.id })

		this.options = options
	}

	private async streaming() {
		const { model, system_prompt, temperature, top_p, max_ouput_tokens } = this.options
		const { provider, value } = model

		this.streamed = true

		this.setLoading(true)

		const settings: CallSettings & Prompt = {}

		if (max_ouput_tokens) settings['maxOutputTokens'] = max_ouput_tokens
		if (system_prompt) settings['system'] = system_prompt

		const { textStream, toUIMessageStreamResponse } = streamText({
			model: getProvider({ name: provider as ProviderKey, api_key: this.provider.api_key })!(value),
			temperature,
			topP: top_p,
			messages: this.messages.reduce((total, item) => {
				total.push(...item.items)

				return total
			}, [] as Array<ModelMessage>),
			abortSignal: this.abort_controller.signal,
			...settings,
			onFinish: this.onFinish.bind(this),
			onAbort: this.onStop.bind(this),
			onError: this.onStop.bind(this)
		})

		this.abort_controller.abort()

		for await (const text of textStream) {
			this.current += text

			this.event.emit(`${this.id}/CHANGE`, { type: 'streaming', text } as Conversation.EventRes)
		}
	}

	private async onFinish(...args: Parameters<StreamTextOnFinishCallback<ToolSet>>) {
		const [{ response, usage }] = args
		const { inputTokens, outputTokens, totalTokens } = usage
		const { id, timestamp, messages } = response

		this.current = ''

		this.messages.push({
			id,
			role: 'assistant',
			timestamp: timestamp.valueOf(),
			items: messages,
			tokens: {
				input: inputTokens,
				output: outputTokens,
				total: totalTokens
			}
		})

		this.persist()
	}

	private async onStop() {
		this.messages.push({
			id: genId(),
			role: 'assistant',
			timestamp: dayjs().valueOf(),
			items: [{ role: 'assistant', content: [{ type: 'text', text: this.current }] }]
		})

		this.persist()
		this.setLoading(false)
	}

	private async setLoading(v: boolean) {
		this.event.emit(`${this.id}/CHANGE`, { type: 'sync_loading', loading: v } as Conversation.EventRes)

		await this.write({ module: 'file_index', filename: this.id, merge: true, data: { loading: v } })
	}

	private async persist() {
		this.write({
			module: 'chat',
			filename: this.id,
			merge: true,
			data: { messages: this.messages }
		})
	}

	public async abort() {
		await this.setLoading(false)

		this.abort_controller.abort()
	}
}

export * from './types'
