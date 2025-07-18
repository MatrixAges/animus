import { object, string } from 'zod'

import { getLRUMap, p } from '@desktop/utils'

const input_type = object({
	module: string()
})

export default p.input(input_type).query(async ({ input }) => {
	const { module } = input

	return getLRUMap({ module, filename: 'recent' })
})
