import { object, string } from 'zod'

import { p, read, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	filename: string()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, filename } = input

	const list = (await read({ module, filename: 'list' })) || {}

	delete list[filename]

	await write({ module, filename: 'list', data: list })
})
