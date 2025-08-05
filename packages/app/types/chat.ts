import type { Conversation } from 'fst/conversation'

export namespace Chat {
	export type Options = Conversation.Options & {
		newline_by_enter: boolean
	}
}
