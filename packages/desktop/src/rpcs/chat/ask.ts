import { object, string } from 'zod'

import { p } from '@desktop/utils'

import { event } from './utils'

const input_type = object({
	id: string(),
	question: string()
})

export default p.input(input_type).query(async ({ input }) => {
	const { id, question } = input

	event.emit(`${id}/ASK`, question)
})
