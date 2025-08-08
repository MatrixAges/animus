import { JsonToSseTransformStream } from 'ai'
import { stream } from 'hono/streaming'

import { ChatStore, ChatStreamStore } from '@desktop/utils'

import type { HonoContext } from '@desktop/types'

export default async (c: HonoContext) => {
	const { id, messages } = await c.req.json<{ id: string; messages: any }>()
	const store_stream = await ChatStreamStore.resumeExistingStream(id)

	if (store_stream) return stream(c, s => s.pipe(store_stream))

	const store_chat = ChatStore.get(id)!
	const chat_stream = store_chat.getStream(messages)

	const target_stream = await ChatStreamStore.resumableStream(id, () =>
		chat_stream.pipeThrough(new JsonToSseTransformStream())
	)

	if (!target_stream) return

	return stream(c, s => s.pipe(target_stream))
}
