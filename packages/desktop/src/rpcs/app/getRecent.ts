import { object, string } from 'zod'

import { p } from '@desktop/utils'

const input_type = object({ module: string(), filename: string() })

export default p.input(input_type).query(async ({ input }) => {
	const { module, filename } = input
})
