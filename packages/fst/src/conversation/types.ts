import type { EventEmitter } from 'events'
import type Conversation from '.'

export interface ArgsInit {
	id: string
	event: EventEmitter
	read: (args: { filename: string; module?: string; ext?: string }) => Promise<any>
	write: (args: {
		filename: string
		data: any
		module?: string
		ext?: string
		merge?: boolean
		default_value?: any
	}) => Promise<void>
}

export namespace Conversation {
	export type Options = {
		system_prompt: string
		prompt_rewriting: boolean
		web_search_enabled: boolean
		web_search_engine: string
		temperature: number
		top_p: number
		max_ouput_tokens: number
		question: string
		name: string
		model: { provider: string; group: string; label: string; value: string }
	}

	export type EventRes =
		| { type: 'ask'; question: string }
		| { type: 'sync'; messages: Conversation['messages']; current: string }
		| { type: 'streaming'; text: string }
}
