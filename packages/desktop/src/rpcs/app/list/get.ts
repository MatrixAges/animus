import { object, string } from 'zod'

import { p, read } from '@desktop/utils'

const input_type = object({
	module: string()
})

export default p.input(input_type).query(async ({ input }) => {
	const { module } = input

	return read({ module, filename: 'list' })
})
