import type { Provider } from '@/ai'

export default {
	links: {
		website: 'https://gemini.google.com/',
		api_key: 'https://aistudio.google.com/app/apikey',
		doc: 'https://ai.google.dev/gemini-api/docs',
		model_spec: 'https://ai.google.dev/gemini-api/docs/models/gemini'
	},
	form: {
		enabled: false,
		api_key: '',
		api_base_url: 'https://generativelanguage.googleapis.com',
		models: {
			'Gemini 2.5': [
				{
					id: 'gemini-2.5-pro',
					name: 'Gemini 2.5 Pro',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true,
						web_search: true
					}
				},
				{
					id: 'gemini-2.5-flash',
					name: 'Gemini 2.5 Flash',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true,
						web_search: true
					}
				}
			],
			'Gemini 2.0': [
				{
					id: 'gemini-2.0-flash',
					name: 'Gemini 2.0 Flash',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true,
						web_search: true
					}
				},
				{
					id: 'gemini-2.0-flash-lite',
					name: 'Gemini 2.0 Flash-Lite',
					features: {
						function_calling: true,
						structured_output: true
					}
				}
			],
			'': [
				{
					id: 'gemini-embedding-exp-03-07',
					name: 'Gemini Embedding',
					features: {
						embedding: true
					}
				}
			]
		}
	}
} as Provider
