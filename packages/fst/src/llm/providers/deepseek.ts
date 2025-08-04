import type { Links, Provider } from '@fst/llm'

export const links = {
	website: 'https://www.deepseek.com',
	api_key: 'https://platform.deepseek.com/api_keys',
	doc: 'https://api-docs.deepseek.com',
	model_spec: 'https://api-docs.deepseek.com/quick_start/pricing'
} as Links

export const config = {
	enabled: false,
	api_key: '',
	models: [
		{
			group: 'Deepseek',
			items: [
				{
					enabled: true,
					id: 'deepseek-reasoner',
					name: 'Deepseek R1',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true
					}
				},
				{
					enabled: true,
					id: 'deepseek-chat',
					name: 'Deepseek V3',
					features: {
						function_calling: true,
						structured_output: true
					}
				}
			]
		}
	]
} as Provider
