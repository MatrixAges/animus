import { object, string } from 'zod'

import { p, read } from '@desktop/utils'

const input_type = object({
	module: string(),
	key: string()
})

export default p.input(input_type).query(async ({ input }) => {
	const { module, key } = input

	return read({ module, filename: key })
})
