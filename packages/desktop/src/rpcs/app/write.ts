import { any, boolean, object, string } from 'zod'

import { p, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	filename: string(),
	data: any(),
	recent: boolean().optional()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, filename, data, recent } = input

	await write({ module, filename, data })
})
