import to from 'await-to-js'
import { any, boolean, object, string } from 'zod'

import { p, read, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	filename: string(),
	data: any(),
	merge: boolean().optional(),
	deepmerge: boolean().optional()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, filename, data, merge, deepmerge } = input

	await write({ module, filename, merge, deepmerge, data })
})
