import { boolean, literal, number, object, string } from 'zod'

import { conf, decode, encode, now_ms, p } from '@electron/utils'

const input_type = object({
	is_infinity: boolean().optional(),
	paid_plan: string().optional().nullable(),
	paid_expire: number().optional().nullable()
})

const output_type = literal(null)

export default p
	.input(input_type)
	.output(output_type)
	.mutation(({ input }) => {
		const paid_info = conf.get('paid_info') as string

		if (!paid_info) return null

		const prev_data = decode(paid_info)

		let target = {} as any

		if (input.is_infinity) {
			target = { is_infinity: true }
		} else {
			target = { ...prev_data, ...input }
		}

		conf.set('paid_info', encode({ ...target, verify_at: now_ms() }))

		return null
	})
