import type { Links, Provider } from '@fst/llm'

export const links = {
	website: 'https://openrouter.ai/',
	api_key: 'https://openrouter.ai/settings/keys',
	doc: 'https://openrouter.ai/docs/quick-start',
	model_spec: 'https://openrouter.ai/models'
} as Links

export default {
	enabled: false,
	api_key: '',
	models: [
		{
			group: 'Deepseek',
			items: [
				{
					enabled: true,
					id: 'deepseek/deepseek-r1-0528:free',
					name: 'Deepseek R1',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true
					}
				},
				{
					enabled: true,
					id: 'deepseek/deepseek-chat-v3-0324:free',
					name: 'Deepseek V3',
					features: {
						function_calling: true,
						structured_output: true
					}
				}
			]
		},
		{
			group: 'Gemini 2.0',
			items: [
				{
					enabled: true,
					id: 'google/gemini-2.0-flash-exp:free',
					name: 'Gemini 2.0 Flash',
					features: {
						function_calling: true,
						structured_output: true,
						web_search: true
					}
				}
			]
		},
		{
			group: 'Qwen',
			items: [
				{
					enabled: true,
					id: 'qwen/qwen3-32b:free',
					name: 'Qwen3 32B',
					features: {
						function_calling: true,
						structured_output: true
					}
				}
			]
		}
	]
} as Provider
