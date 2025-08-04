import to from 'await-to-js'
import Conversation from 'fst/conversation'
import { object, string, undefined as Undefined, union } from 'zod'

import { p } from '@desktop/utils'

const input_type = object({
	provider: string(),
	model: string(),
	question: string()
})

const output_type = union([
	Undefined()
	// object({
	// 	err: string()
	// })
])

export default p
	.input(input_type)
	.output(output_type)
	.mutation(async ({ input }) => {
		const { provider, model, question } = input

		const [err, res] = await to(new Conversation().init({ provider, model, question }))

		if (err) return { err: err.message }
	})
