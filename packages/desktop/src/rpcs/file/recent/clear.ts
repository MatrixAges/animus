import { object, string } from 'zod'

import { p, setLRUMap } from '@desktop/utils'

const input_type = object({
	module: string()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module } = input

	setLRUMap({ module, filename: 'recent', type: 'clear' })
})
