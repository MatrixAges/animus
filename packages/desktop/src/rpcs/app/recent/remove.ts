import { object, string } from 'zod'

import { p, setLRUMap } from '@desktop/utils'

const input_type = object({
	module: string(),
	filename: string()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, filename } = input

	if (module !== 'global') setLRUMap({ module, filename: 'recent', items: [filename], type: 'remove' })

	setLRUMap({ module: 'global', filename: 'recent', items: [filename], type: 'remove' })
})
