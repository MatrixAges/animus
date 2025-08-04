import type { Links, Provider } from '@fst/llm'

export const links = {
	website: 'https://x.ai',
	api_key: 'https://console.x.ai',
	doc: 'https://docs.x.ai/docs/overview',
	model_spec: 'https://docs.x.ai/docs/models'
} as Links

export const config = {
	enabled: false,
	api_key: '',
	models: [
		{
			group: 'Grok',
			items: [
				{
					enabled: true,
					id: 'grok-4-0709',
					name: 'Grok 4',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true
					}
				},
				{
					enabled: true,
					id: 'grok-3',
					name: 'Grok 3',
					features: {
						function_calling: true,
						structured_output: true
					}
				},
				{
					enabled: true,
					id: 'grok-3-fast',
					name: 'Grok 3 Fast',
					features: {
						function_calling: true,
						structured_output: true
					}
				},
				{
					enabled: true,
					id: 'grok-3-mini',
					name: 'Grok 3 Mini',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true
					}
				},
				{
					enabled: true,
					id: 'grok-3-mini-fast',
					name: 'Grok 3 Mini Fast',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true
					}
				}
			]
		}
	]
} as Provider
