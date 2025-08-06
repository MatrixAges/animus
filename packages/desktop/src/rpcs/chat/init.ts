import { on } from 'events'
import Conversation from 'fst/conversation'
import { object, string } from 'zod'

import { p, read, write } from '@desktop/utils'

import { event } from './utils'

import type { Conversation as NConversation } from 'fst/conversation'

const input_type = object({
	id: string()
})

export default p.input(input_type).subscription(async function* (args) {
	const { signal, input } = args
	const { id } = input

	const conversation = new Conversation()

	conversation.init({ id, event, read, write })

	event.on(`${id}/ASK`, (question: string) => conversation.ask(question))
	event.on(`${id}/UPDATE_OPTIONS`, () => conversation.updateOptions())

	try {
		for await (const [data] of on(event, `${id}/CHANGE`, { signal })) {
			yield data as NConversation.EventRes
		}
	} finally {
		event.removeAllListeners()
		conversation.abort()
	}
})
