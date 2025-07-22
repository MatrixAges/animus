import dayjs from 'dayjs'
import { moveObject } from 'stk/utils'
import { object, string } from 'zod'

import { p, read, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	filename: string(),
	from_key: string(),
	to_key: string()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, filename, from_key, to_key } = input

	const list = (await read({ module, filename })) || {}

	list[from_key].update_at = dayjs().valueOf()
	list[to_key].update_at = dayjs().valueOf()

	const target_items = moveObject(list, from_key, to_key)

	await write({ module, filename, data: target_items })
})
