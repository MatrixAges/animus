import { array, boolean, object, record, string } from 'zod'

export const schema = object({
	enabled: boolean(),
	api_key: string(),
	models: record(
		string('').describe('group_name'),
		array(
			object({
				enabled: boolean(),
				id: string(),
				name: string(),
				preset_id: string().optional(),
				vision: boolean().optional(),
				voice: boolean().optional(),
				features: object({
					function_calling: boolean().optional(),
					structured_output: boolean().optional(),
					reasoning: boolean().optional(),
					reasoning_optional: boolean().optional(),
					web_search: boolean().optional(),
					image_input: boolean().optional(),
					image_output: boolean().optional(),
					audio_input: boolean().optional(),
					audio_output: boolean().optional(),
					embedding: boolean().optional(),
					reranking: boolean().optional()
				}).optional()
			})
		)
	)
})
export const custom_schema = schema.extend({
	api_base_url: string()
})
export const openai_compatible_schema = schema.extend({
	name: string(),
	api_base_url: string()
})
export const ollama_schema = schema.omit({ api_key: true }).extend({
	api_base_url: string()
})
export const azure_openai_schema = schema.extend({
	api_version: string()
})
export const amazon_bedrock_schema = schema.omit({ api_key: true }).extend({
	region: string(),
	accessKeyId: string(),
	secretAccessKey: string(),
	sessionToken: string()
})
export * from './preset'
