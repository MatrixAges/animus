import { number, object, string } from 'zod'

export const preset_schema = object({
	temperature: number().optional(),
	top_p: number().optional(),
	max_ouput_tokens: number().optional(),
	system_prompt: string().optional()
})
