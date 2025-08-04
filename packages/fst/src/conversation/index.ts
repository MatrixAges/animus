import { streamText } from 'ai'
import { id } from 'stk/common'

import { google } from '@ai-sdk/google'

import type { Chat } from '@app/types'
import type { ArgsInit } from './types'

export default class Index {
	id = ''
	options = {} as Chat.Options
	messages = {} as Record<string, string>
	read = null as unknown as ArgsInit['read']
	write = null as unknown as ArgsInit['write']

	async init(args: ArgsInit) {
		const { id, read, write } = args

		this.id = id
		this.read = read
		this.write = write

		this.options = await read({ module: 'chat', filename: id })

		const { model } = this.options
		const { provider, value } = model
		const { promise, resolve, reject } = Promise.withResolvers()

		switch (provider) {
			case 'google_gemini':
				const { textStream } = streamText({
					model: google(value),
					prompt: 'Write a poem about embedding models.',
					onError: err => reject(err.error),
					onFinish: () => resolve(1)
				})

				const writableStream = new WritableStream({
					write(chunk) {
						const text = new TextDecoder().decode(chunk)

						console.log(text)
					},
					close() {}
				})

				await textStream.pipeTo(writableStream)
				break

			default:
				break
		}

		return promise
	}

	import() {}

	export() {}
}
