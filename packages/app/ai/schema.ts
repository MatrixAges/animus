import { array, boolean, infer as Infer, object, record, string } from 'zod'

export const provider_schema = object({
	links: object({
		website: string(),
		api_key: string(),
		doc: string(),
		model_spec: string()
	}),
	form: object({
		enabled: boolean(),
		api_key: string(),
		api_base_url: string(),
		models: record(
			string('').describe('group_name'),
			array(
				object({
					id: string(),
					name: string(),
					vision: boolean().optional(),
					voice: boolean().optional(),
					features: object({
						function_calling: boolean().optional(),
						structured_output: boolean().optional(),
						reasoning: boolean().optional(),
						web_search: boolean().optional(),
						image_input: boolean().optional(),
						image_output: boolean().optional(),
						audio_input: boolean().optional(),
						audio_output: boolean().optional(),
						streaming: boolean().optional(),
						embedding: boolean().optional()
					}).optional()
				})
			)
		)
	})
})

export type Provider = Infer<typeof provider_schema>
