import { on } from 'events'
import Chat from 'fst/chat'
import { string } from 'zod'

import { ChatEventStore, ChatStore, p, read, write } from '@desktop/utils'

import type { ChatEventRes } from 'fst/chat'

export default p.input(string()).subscription(async function* (args) {
	const { signal, input: id } = args

	let chat = ChatStore.get(id) as Chat

	if (!chat) {
		chat = new Chat()

		const messages = await chat.init({ id, event: ChatEventStore, read, write })

		ChatStore.set(id, chat)

		yield { type: 'init', messages } as ChatEventRes
	}

	ChatEventStore.on(`${id}/UPDATE_OPTIONS`, () => chat.updateOptions())
	ChatEventStore.on(`${id}/DESTORY`, () => ChatStore.delete(id))

	try {
		for await (const [data] of on(ChatEventStore, `${id}/CHANGE`, { signal })) {
			yield data as ChatEventRes
		}
	} finally {
		ChatEventStore.removeAllListeners()
		chat.abort()
	}
})
