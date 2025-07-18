import { array, object, string } from 'zod'

import { list_item_schema } from '@desktop/schemas'
import { p, setLRUMap } from '@desktop/utils'

const input_type = object({
	module: string(),
	items: array(list_item_schema)
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, items } = input

	if (module !== 'global') setLRUMap({ module, filename: 'recent', items })

	setLRUMap({ module: 'global', filename: 'recent', items })
})
