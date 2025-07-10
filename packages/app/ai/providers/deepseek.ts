import type { Provider } from '@/ai'

export default {
	links: {
		website: 'https://www.deepseek.com/',
		api_key: 'https://platform.deepseek.com/api_keys',
		doc: 'https://api-docs.deepseek.com',
		model_spec: 'https://api-docs.deepseek.com/quick_start/pricing'
	},
	form: {
		enabled: false,
		api_key: '',
		api_base_url: 'https://api.deepseek.com',
		models: {
			'': [
				{
					id: 'deepseek-reasoner',
					name: 'Deepseek R1',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true
					}
				},
				{
					id: 'deepseek-chat',
					name: 'Deepseek V3',
					features: {
						function_calling: true,
						structured_output: true
					}
				}
			]
		}
	}
} as Provider
