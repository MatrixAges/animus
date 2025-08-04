import type { Links, Provider } from '@fst/llm'

export const links = {
	website: 'https://fireworks.ai',
	api_key: 'https://fireworks.ai/account/api-keys',
	doc: 'https://docs.fireworks.ai/getting-started/introduction',
	model_spec: 'https://fireworks.ai/dashboard/models'
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
					id: 'accounts/fireworks/models/deepseek-r1',
					name: 'Deepseek R1',
					features: {
						reasoning: true
					}
				},
				{
					enabled: true,
					id: 'accounts/fireworks/models/deepseek-v3',
					name: 'Deepseek V3',
					features: {
						function_calling: true,
						structured_output: true
					}
				}
			]
		},
		{
			group: 'Llama',
			items: [
				{
					enabled: true,
					id: 'accounts/fireworks/models/llama-v3p1-405b-instruct',
					name: 'Llama V3 405B',
					features: {
						function_calling: true,
						structured_output: true
					}
				},
				{
					enabled: true,
					id: 'accounts/fireworks/models/llama-v3p1-8b-instruct',
					name: 'Llama V3 8B',
					features: {
						function_calling: true,
						structured_output: true
					}
				}
			]
		}
	]
} as Provider
