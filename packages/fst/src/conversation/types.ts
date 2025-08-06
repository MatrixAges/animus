import type { ModelMessage } from 'ai'
import type { EventEmitter } from 'events'
import type ConversationClass from '.'

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
	export interface Options {
		type: 'chat' | 'role'
		question: string
		model: { provider: string; group: string; label: string; value: string }
		system_prompt: string
		prompt_rewriting: boolean
		web_search_enabled: boolean
		web_search_engine: string
		temperature: number
		top_p: number
		max_ouput_tokens: number
	}

	export interface Message {
		id: string
		role: 'user' | 'assistant'
		timestamp: number
		items: Array<ModelMessage>
		tokens?: {
			input?: number
			output?: number
			total?: number
		}
	}

	export type EventRes =
		| { type: 'ask'; message: Message }
		| { type: 'sync'; messages: ConversationClass['messages']; current: string }
		| { type: 'streaming'; text: string }
		| { type: 'sync_options'; options: Options }
		| { type: 'sync_loading'; loading: boolean }
}
