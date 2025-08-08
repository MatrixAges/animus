// Rewrite from https://github.com/vercel/resumable-stream/blob/main/src/runtime.ts

import { getPubSub } from './pubsub'

const { publisher, subscriber } = getPubSub()

const DONE_MESSAGE = '\n\n\nDONE_SENTINEL_hasdfasudfyge374%$%^$EDSATRTYFtydryrte\n'
const DONE_VALUE = 'DONE'

export function createResumableStreamContext() {
	return {
		resumeExistingStream: async (id: string) => {
			return resumeExistingStream(id)
		},
		createNewResumableStream: async (id: string, makeStream: () => ReadableStream<string>) => {
			publisher.set(`sentinel:${id}`, '1')

			return createNewResumableStream(id, makeStream)
		},
		resumableStream: async (id: string, makeStream: () => ReadableStream<string>) => {
			return createResumableStream(id, makeStream)
		},
		hasExistingStream: (id: string) => {
			const state = publisher.get(`sentinel:${id}`)

			if (state === null) return null
			if (state === DONE_VALUE) return DONE_VALUE

			return true
		}
	} as const
}

async function resumeExistingStream(id: string) {
	const state = publisher.get(`sentinel:${id}`)

	if (!state) return null
	if (state === DONE_VALUE) return null

	return resumeStream(id)
}

function createNewResumableStream(id: string, makeStream: () => ReadableStream<string>) {
	const chunks: string[] = []
	let listenerChannels: string[] = []

	let isDone = false

	subscriber.subscribe(`request:${id}`, async (listenerId: string) => {
		listenerChannels.push(listenerId)
		const chunksToSend = chunks.join('')
		const promises = []

		promises.push(publisher.publish(`chunk:${listenerId}`, chunksToSend))

		if (isDone) {
			promises.push(publisher.publish(`chunk:${listenerId}`, DONE_MESSAGE))
		}
	})

	return new ReadableStream<string>({
		start(controller) {
			const stream = makeStream()
			const reader = stream.getReader()

			function read() {
				reader.read().then(async ({ done, value }) => {
					if (done) {
						isDone = true

						try {
							controller.close()
						} catch (e) {}

						publisher.set(`sentinel:${id}`, DONE_VALUE)
						subscriber.unsubscribe(`request:${id}`)

						for (const listenerId of listenerChannels) {
							publisher.publish(`chunk:${listenerId}`, DONE_MESSAGE)
						}

						return
					}

					chunks.push(value)

					try {
						controller.enqueue(value)
					} catch (e) {}

					for (const listenerId of listenerChannels) {
						publisher.publish(`chunk:${listenerId}`, value)
					}

					read()
				})
			}
			read()
		}
	})
}

async function createResumableStream(id: string, makeStream: () => ReadableStream<string>) {
	const currentListenerCount = publisher.incr(`sentinel:${id}`)

	if (currentListenerCount > 1) {
		return resumeStream(id)
	}

	return createNewResumableStream(id, makeStream)
}

export async function resumeStream(id: string) {
	const listenerId = crypto.randomUUID()

	return new Promise<ReadableStream<string> | null>((resolve, reject) => {
		const readableStream = new ReadableStream<string>({
			async start(controller) {
				try {
					const cleanup = () => {
						subscriber.unsubscribe(`chunk:${listenerId}`)
					}

					const start = Date.now()

					const timeout = setTimeout(async () => {
						cleanup()

						const val = publisher.get(`sentinel:${id}`)

						if (val === DONE_VALUE) {
							resolve(null)
						}

						if (Date.now() - start > 1000) {
							controller.error(new Error('Timeout waiting for ack'))
						}
					}, 1000)

					subscriber.subscribe(`chunk:${listenerId}`, (message: string) => {
						clearTimeout(timeout)
						resolve(readableStream)

						if (message === DONE_MESSAGE) {
							try {
								controller.close()
							} catch (e) {
								console.error(e)
							}

							cleanup()

							return
						}

						try {
							controller.enqueue(message)
						} catch (e) {
							console.error(e)

							cleanup()
						}
					})

					publisher.publish(`request:${id}`, listenerId)
				} catch (e) {
					reject(e)
				}
			}
		})
	})
}
