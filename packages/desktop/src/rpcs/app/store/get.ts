import { string } from 'zod'

import { p, read } from '@desktop/utils'

const input_type = string()

export default p.input(input_type).query(async ({ input }) => {
	return read({ module: 'store', filename: input, ext: 'key' })
})
