import type { Links, Provider } from '@fst/llm'

export const links = {
	website: 'https://gemini.google.com/',
	api_key: 'https://aistudio.google.com/app/apikey',
	doc: 'https://ai.google.dev/gemini-api/docs',
	model_spec: 'https://ai.google.dev/gemini-api/docs/models/gemini'
} as Links

export const config = {
	enabled: false,
	api_key: '',
	models: [
		{
			group: 'Gemini 2.5',
			items: [
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
			]
		},
		{
			group: 'Gemini 2.0',
			items: [
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
			]
		}
	]
} as Provider
