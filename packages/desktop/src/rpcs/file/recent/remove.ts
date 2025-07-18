import { object, string } from 'zod'

import { p, setLRUMap } from '@desktop/utils'

import type { ListItem } from '@desktop/schemas'

const input_type = object({
	module: string(),
	id: string()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { module, id } = input

	if (module !== 'global') setLRUMap({ module, filename: 'recent', items: [{ id } as ListItem], type: 'remove' })

	setLRUMap({ module: 'global', filename: 'recent', items: [{ id } as ListItem], type: 'remove' })
})
