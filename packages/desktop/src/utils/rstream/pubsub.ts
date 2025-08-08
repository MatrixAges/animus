import type { PubSub } from '@desktop/types'

export const getPubSub = () => {
	const subscriptions = new Map<string, ((message: string) => void)[]>()
	const data = new Map<string, string | number>()

	const pubsub: PubSub = {
		publish: (channel, message) => {
			const callbacks = subscriptions.get(channel) || []

			for (const callback of callbacks) {
				callback(message)
			}
		},
		subscribe: (channel, callback) => {
			const callbacks = subscriptions.get(channel) || []

			callbacks.push(callback)
			subscriptions.set(channel, callbacks)
		},
		unsubscribe: channel => {
			subscriptions.delete(channel)
		},
		set: (key, value) => {
			data.set(key, value)
		},
		get: key => {
			return data.get(key) || null
		},
		incr: key => {
			const value = Number(data.get(key) || 0)
			const new_value = value + 1

			data.set(key, new_value)

			return new_value
		}
	}

	return {
		subscriber: pubsub,
		publisher: pubsub
	}
}
