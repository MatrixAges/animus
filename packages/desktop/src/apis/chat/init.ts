import { any, infer as Infer, literal, object, string, union } from 'zod'

import { zValidator } from '@hono/zod-validator'

import type { GetValidateData, HonoContext } from '@desktop/types'
import type { TypedResponse } from 'hono'

const input_type = object({
	id: string(),
	token: string()
})

const output_type = any()

type Input = Infer<typeof input_type>
type Output = Promise<TypedResponse<Infer<typeof output_type>>>

const handler = async (c: HonoContext<GetValidateData<Input>>): Output => {
	return c.json({})
}

export default {
	validator: zValidator('json', input_type),
	handler
}
