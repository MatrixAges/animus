import { any, object, string } from 'zod'

import { p, write } from '@desktop/utils'

const input_type = object({
	key: string(),
	value: any()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { key, value } = input

	await write({ module: 'store', filename: key, data: value, ext: 'key' })
})
