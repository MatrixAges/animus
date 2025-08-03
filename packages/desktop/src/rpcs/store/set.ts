import { set } from 'es-toolkit/compat'
import { any, object, string } from 'zod'

import { p, read, write } from '@desktop/utils'

const input_type = object({
	module: string(),
	key: string(),
	value: any(),
	filename: string().optional()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, key, value, filename } = input

	if (filename) {
		const data = (await read({ module, filename })) || {}

		set(data, key, value)
		await write({ module, filename, data })
	} else {
		await write({ module, filename: key, data: value })
	}
})
