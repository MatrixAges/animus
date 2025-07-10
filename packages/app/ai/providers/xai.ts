import type { Provider } from '@/ai'

export default {
	links: {
		website: 'https://v0.dev',
		api_key: 'https://v0.dev',
		doc: 'https://v0.dev/docs/introduction',
		model_spec: 'https://v0.dev/docs/v0-model-api'
	},
	form: {
		enabled: false,
		api_key: '',
		api_base_url: 'https://api.v0.dev/v1',
		models: {
			'': [
				{
					id: 'v0-1.5-md',
					name: 'V0 1.5-md',
					features: {
						function_calling: true,
						structured_output: true,
						image_input: true
					}
				},
				{
					id: 'v0-1.5-lg',
					name: 'V0 1.5-lg',
					features: {
						function_calling: true,
						structured_output: true,
						image_input: true
					}
				},
				{
					id: 'v0-1.0-md',
					name: 'V0 1.0-md',
					features: {
						function_calling: true,
						structured_output: true,
						image_input: true
					}
				}
			]
		}
	}
} as Provider
