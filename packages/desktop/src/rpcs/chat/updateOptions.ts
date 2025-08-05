import { object, string } from 'zod'

import { p } from '@desktop/utils'

import { event } from './utils'

const input_type = object({
	id: string()
})

export default p.input(input_type).mutation(async ({ input }) => {
	const { id } = input

	event.emit(`${id}/UPDATE_OPTIONS`)
})
