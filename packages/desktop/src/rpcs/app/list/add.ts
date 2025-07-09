import { object, string } from 'zod'

import { moveObject, p, read, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	from: string(),
	to: string()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, from, to } = input

	const list = (await read({ module, filename: 'list' })) || {}

	await write({ module, filename: 'list', data: moveObject(list, from, to) })
})
