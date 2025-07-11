import type { Links, Provider } from '@/ai'

export const links = {
	website: 'https://gemini.google.com/',
	api_key: 'https://aistudio.google.com/app/apikey',
	doc: 'https://ai.google.dev/gemini-api/docs',
	model_spec: 'https://ai.google.dev/gemini-api/docs/models/gemini'
} as Links

export default {
	enabled: false,
	api_key: '',
	models: {
		'Gemini 2.5': [
			{
				enabled: true,
				id: 'gemini-2.5-pro',
				name: 'Gemini 2.5 Pro',
				features: {
					function_calling: true,
					structured_output: true,
					reasoning: true,
					reasoning_optional: true,
					web_search: true
				}
			},
			{
				enabled: true,
				id: 'gemini-2.5-flash',
				name: 'Gemini 2.5 Flash',
				features: {
					function_calling: true,
					structured_output: true,
					reasoning: true,
					reasoning_optional: true,
					web_search: true
				}
			}
		],
		'Gemini 2.0': [
			{
				enabled: true,
				id: 'gemini-2.0-flash',
				name: 'Gemini 2.0 Flash',
				features: {
					function_calling: true,
					structured_output: true,
					reasoning: true,
					reasoning_optional: true,
					web_search: true
				}
			},
			{
				enabled: true,
				id: 'gemini-2.0-flash-lite',
				name: 'Gemini 2.0 Flash Lite',
				features: {
					function_calling: true,
					structured_output: true
				}
			}
		],
		'': [
			{
				enabled: true,
				id: 'gemini-embedding-exp-03-07',
				name: 'Gemini Embedding',
				features: {
					embedding: true
				}
			}
		]
	}
} as Provider
