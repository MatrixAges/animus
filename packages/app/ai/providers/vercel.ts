import type { Provider } from '@/ai'

export default {
	links: {
		website: 'https://x.ai',
		api_key: 'https://console.x.ai',
		doc: 'https://docs.x.ai/docs/overview',
		model_spec: 'https://docs.x.ai/docs/models'
	},
	form: {
		enabled: false,
		api_key: '',
		api_base_url: 'https://api.x.ai',
		models: {
			'': [
				{
					id: 'grok-4-0709',
					name: 'Grok 4',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true
					}
				},
				{
					id: 'grok-3',
					name: 'Grok 3',
					features: {
						function_calling: true,
						structured_output: true
					}
				},
				{
					id: 'grok-3-fast',
					name: 'Grok 3-fast',
					features: {
						function_calling: true,
						structured_output: true
					}
				},
				{
					id: 'grok-3-mini',
					name: 'Grok 3-mini',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true
					}
				},
				{
					id: 'grok-3-mini-fast',
					name: 'Grok 3-mini-fast',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true
					}
				}
			]
		}
	}
} as Provider
