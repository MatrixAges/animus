import { get } from 'es-toolkit/compat'
import { object, string } from 'zod'

import { p, read } from '@desktop/utils'

const input_type = object({
	module: string(),
	key: string(),
	filename: string().optional()
})

export default p.input(input_type).query(async ({ input }) => {
	const { module, key, filename } = input

	if (!filename) return read({ module, filename: key })

	const res = await read({ module, filename })

	return get(res || {}, key)
})
