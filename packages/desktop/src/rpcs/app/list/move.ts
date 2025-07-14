import dayjs from 'dayjs'
import { object, string } from 'zod'

import { moveObject, p, read, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	from_key: string(),
	to_key: string()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, from_key, to_key } = input

	const list = (await read({ module, filename: 'list' })) || {}

	list[from_key].update_at = dayjs().valueOf()
	list[to_key].update_at = dayjs().valueOf()

	const target_items = moveObject(list, from_key, to_key)

	await write({ module, filename: 'list', data: target_items })
})
