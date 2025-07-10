import type { Provider } from '@/ai'

export default {
	links: {
		website: 'https://openai.com/',
		api_key: 'https://platform.openai.com/api-keys',
		doc: 'https://platform.openai.com/docs/overview',
		model_spec: 'https://platform.openai.com/docs/models'
	},
	form: {
		enabled: false,
		api_key: '',
		api_base_url: 'https://api.openai.com',
		models: {
			'': [
				{
					id: 'gpt-4.1',
					name: 'GPT 4.1',
					features: {
						function_calling: true,
						structured_output: true,
						web_search: true,
						image_input: true
					}
				}
			],
			'GPT 4o': [
				{
					id: 'gpt-4o',
					name: 'GPT 4o',
					features: {
						function_calling: true,
						structured_output: true,
						web_search: true,
						image_input: true
					}
				},
				{
					id: 'gpt-4o-mini',
					name: 'GPT 4o-mini',
					features: {
						function_calling: true,
						structured_output: true,
						web_search: true,
						image_input: true
					}
				}
			],
			'': [
				{
					id: 'o4-mini',
					name: 'o4 mini',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true,
						web_search: true,
						image_input: true
					}
				},
				{
					id: 'o3',
					name: 'o3',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true,
						web_search: true,
						image_input: true
					}
				},
				{
					id: 'o3-mini',
					name: 'o3 mini',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true,
						web_search: true,
						image_input: true
					}
				}
			]
		}
	}
} as Provider
