import dayjs from 'dayjs'
import { array, object, string } from 'zod'

import { list_item_schema } from '@desktop/schemas'
import { p, read, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	filename: string(),
	items: array(list_item_schema)
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, filename, items } = input

	const list = (await read({ module, filename })) || {}
	const now = dayjs().valueOf()

	items.forEach(item => {
		const { id, ...rest } = item

		list[id] = { ...rest, module, create_at: now, update_at: now }
	})

	await write({ module, filename, data: list })
})
