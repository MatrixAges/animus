import { any, object, string } from 'zod'

import { p, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	key: string(),
	value: any()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, key, value } = input

	await write({ module, filename: key, data: value, ext: 'key' })
})
