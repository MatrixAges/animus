export interface Publisher {
	publish: (channel: string, message: string) => void
	set: (key: string, value: string) => void
	get: (key: string) => string | number | null
	incr: (key: string) => number
}

export interface Subscriber {
	subscribe: (channel: string, callback: (message: string) => void) => void
	unsubscribe: (channel: string) => void
}

export type PubSub = Publisher & Subscriber
