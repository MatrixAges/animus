import type { Links, Provider } from '@fst/llm'

export const links = {
	website: 'https://www.together.ai',
	api_key: 'https://api.together.ai/settings/api-keys',
	doc: 'https://docs.together.ai/docs/introduction',
	model_spec: 'https://docs.together.ai/docs/chat-models'
} as Links

export default {
	enabled: false,
	api_key: '',
	models: [
		{
			group: 'Mistral',
			items: [
				{
					enabled: true,
					id: 'mistralai/Mixtral-8x22B-Instruct-v0.1',
					name: 'Mixtral 22B Instruct',
					features: {
						function_calling: true,
						structured_output: true
					}
				},
				{
					enabled: true,
					id: 'mistralai/Mistral-7B-Instruct-v0.3',
					name: 'Mixtral 7B Instruct',
					features: {
						function_calling: true,
						structured_output: true
					}
				}
			]
		}
	]
} as Provider
