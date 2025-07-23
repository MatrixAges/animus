import { array, boolean, infer as Infer, object, string } from 'zod'

export const schema = object({
	enabled: boolean(),
	api_key: string(),
	models: array(
		object({
			group: string().meta({ name: 'group' }),
			items: array(
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
						embedding: boolean().optional(),
						reranking: boolean().optional()
					}).optional()
				})
			)
		})
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

export type Provider = Infer<typeof schema>
export type CustomProvider = Infer<typeof custom_schema>
export type OpenaiCompatibleProvider = Infer<typeof custom_schema>
export type OllamaProvider = Infer<typeof ollama_schema>
export type AzureOpenaiProvider = Infer<typeof azure_openai_schema>
export type AmazonBedrockProvider = Infer<typeof amazon_bedrock_schema>

export * from './preset'
