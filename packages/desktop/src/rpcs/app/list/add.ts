import dayjs from 'dayjs'
import { array, object, string } from 'zod'

import { p, read, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	items: array(
		object({
			filename: string(),
			name: string()
		})
	)
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, items } = input

	const list = (await read({ module, filename: 'list' })) || {}
	const now = dayjs().valueOf()

	items.forEach(item => {
		const { filename, name } = item

		list[filename] = { name, create_at: now, update_at: now }
	})

	await write({ module, filename: 'list', data: list })
})
