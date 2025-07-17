import dayjs from 'dayjs'
import { array, object, string } from 'zod'

import { p, read, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	filename: string(),
	items: array(
		object({
			id: string(),
			name: string().optional(),
			icon: string().optional()
		})
	)
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, filename, items } = input

	const list = (await read({ module, filename })) || {}
	const now = dayjs().valueOf()

	items.forEach(item => {
		const { id, name, icon } = item

		list[id] = { ...list[id], module, name, icon, update_at: now }
	})

	await write({ module, filename, data: list })
})
