import { streamText } from 'ai'
import dayjs from 'dayjs'
import { id as genId } from 'stk/common'

import { getProvider } from './provider'

import type { Provider, ProviderKey } from '@fst/llm'
import type { ModelMessage, StreamTextOnFinishCallback, ToolSet } from 'ai'
import type { EventEmitter } from 'events'
import type { ArgsInit, Conversation } from './types'

export default class Index {
	id = ''
	event = null as unknown as EventEmitter
	options = {} as Conversation.Options
	provider = null as unknown as Provider

	messages = [] as Array<{
		id: string
		timestamp: number
		items: Array<ModelMessage>
		tokens?: {
			input?: number
			output?: number
			total?: number
		}
	}>
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

		const { loading, options, messages } = await read({ module: 'chat', filename: id })
		const providers = await read({ module: 'global', filename: 'providers' })

		this.options = options
		this.messages = messages || []
		this.provider = providers[options.model.provider].config as Provider

		if (loading && this.streamed) {
			event.emit(`${this.id}/CHANGE`, { type: 'sync', messages: this.messages, current: this.current })
		} else {
			this.ask(this.options.question)
			this.streaming()
		}
	}

	async ask(question: string) {
		this.messages.push({
			id: genId(),
			timestamp: dayjs().valueOf(),
			items: [{ role: 'user', content: question }]
		})

		this.event.emit(`${this.id}/CHANGE`, { type: 'ask', question: question })

		this.persist()
	}

	async updateOptions() {
		const { options } = await this.read({ module: 'chat', filename: this.id })

		this.options = options
	}

	private async streaming() {
		const { model, question, system_prompt, temperature, top_p, max_ouput_tokens } = this.options
		const { provider, value } = model

		this.streamed = true

		this.setLoading(true)

		const { textStream } = streamText({
			model: getProvider({ name: provider as ProviderKey, api_key: this.provider.api_key })!(value),
			system: system_prompt,
			temperature,
			topP: top_p,
			maxOutputTokens: max_ouput_tokens,
			messages: this.messages.reduce((total, item) => {
				total.push(...item.items)

				return total
			}, [] as Array<ModelMessage>),
			abortSignal: this.abort_controller.signal,
			onFinish: this.onFinish,
			onAbort: this.onStop,
			onError: this.onStop
		})

		for await (const text of textStream) {
			this.current += text

			this.event.emit(`${this.id}/CHANGE`, { type: 'steaming', text })
		}
	}

	private async onFinish(...args: Parameters<StreamTextOnFinishCallback<ToolSet>>) {
		const [{ response, usage }] = args
		const { inputTokens, outputTokens, totalTokens } = usage
		const { id, timestamp, messages } = response

		this.current = ''

		this.messages.push({
			id,
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
			timestamp: dayjs().valueOf(),
			items: [{ role: 'assistant', content: [{ type: 'text', text: this.current }] }]
		})

		this.persist()
		this.setLoading(false)
	}

	private async setLoading(v: boolean) {
		await Promise.all([
			this.write({ module: 'chat', filename: this.id, merge: true, data: { loading: v } }),
			this.write({ module: 'file_index', filename: this.id, merge: true, data: { loading: v } })
		])
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
