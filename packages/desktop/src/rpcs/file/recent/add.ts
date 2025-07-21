import { array, object, string } from 'zod'

import { p, setLRUMap } from '@desktop/utils'

const input_type = object({
	module: string(),
	items: array(string())
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, items } = input

	if (module !== 'global') setLRUMap({ module, filename: 'recent', items })

	setLRUMap({ module: 'global', filename: 'recent', items })
})
