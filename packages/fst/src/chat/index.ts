import { randomUUID as genId } from 'crypto'
import { convertToModelMessages, smoothStream, streamText } from 'ai'
import dayjs from 'dayjs'

import { getProvider } from './provider'

import type { Provider, ProviderKey } from '@fst/llm'
import type { CallSettings, Prompt } from 'ai'
import type { EventEmitter } from 'events'
import type { ArgsInit, ChatEventRes, ChatOptions, Message } from './types'

export default class Index {
	id = ''
	event = null as unknown as EventEmitter
	options = {} as ChatOptions
	provider = null as unknown as Provider
	abort_controller = new AbortController()

	read = null as unknown as ArgsInit['read']
	write = null as unknown as ArgsInit['write']

	async init(args: ArgsInit) {
		const { id, event, read, write } = args

		this.id = id
		this.event = event
		this.read = read
		this.write = write

		const [{ loading }, { options, messages }, providers] = await Promise.all([
			read({ module: 'file_index', filename: id }),
			read({ module: 'chat', filename: id }),
			read({ module: 'global', filename: 'providers' })
		])

		event.emit(`${this.id}/CHANGE`, { type: 'sync_loading', loading } as ChatEventRes)
		event.emit(`${this.id}/CHANGE`, { type: 'sync_options', options: options } as ChatEventRes)

		this.options = options
		this.provider = providers[options.model.provider].config as Provider

		return messages || []
	}

	getStream(messages: Array<Message>) {
		const { model, system_prompt, temperature, top_p, max_ouput_tokens } = this.options
		const { provider, value } = model
		const that = this

		this.setLoading(true)

		const settings: CallSettings & Prompt = {}

		if (max_ouput_tokens) settings['maxOutputTokens'] = max_ouput_tokens
		if (system_prompt) settings['system'] = system_prompt

		const res = streamText({
			model: getProvider({ name: provider as ProviderKey, api_key: this.provider.api_key })!(value),
			temperature,
			topP: top_p,
			messages: convertToModelMessages(messages),
			abortSignal: this.abort_controller.signal,
			...settings,
			experimental_transform: smoothStream(),
			onAbort: this.onStop.bind(this),
			onError: this.onStop.bind(this)
		})

		return res.toUIMessageStream({
			onFinish: ({ messages }) => {
				that.persist(messages)
			}
		})
	}

	private async onStop() {
		this.setLoading(false)
	}

	private async setLoading(v: boolean) {
		this.event.emit(`${this.id}/CHANGE`, { type: 'sync_loading', loading: v } as ChatEventRes)

		await this.write({ module: 'file_index', filename: this.id, merge: true, data: { loading: v } })
	}

	async updateOptions() {
		const { options } = await this.read({ module: 'chat', filename: this.id })

		this.options = options
	}

	private async persist(messages: Array<Message>) {
		this.write({
			module: 'chat',
			filename: this.id,
			merge: true,
			data: { messages }
		})
	}

	public async abort() {
		await this.setLoading(false)

		this.abort_controller.abort()
	}
}

export * from './types'
