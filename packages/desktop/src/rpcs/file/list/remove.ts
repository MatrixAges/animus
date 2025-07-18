import { object, string } from 'zod'

import { p, read, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	filename: string(),
	id: string()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, filename, id } = input

	const list = (await read({ module, filename })) || {}

	delete list[id]

	await write({ module, filename, data: list })
})
