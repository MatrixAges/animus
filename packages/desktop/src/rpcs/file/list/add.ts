import { array, object, string } from 'zod'

import { p, read, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	filename: string(),
	items: array(string())
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, filename, items } = input

	const list = (await read({ module, filename })) || []

	list.push(...items)

	await write({ module, filename, data: list })
})
