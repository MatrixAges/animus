import type { Links, Provider } from '@fst/llm'

export const links = {
	website: 'https://openai.com/',
	api_key: 'https://platform.openai.com/api-keys',
	doc: 'https://platform.openai.com/docs/overview',
	model_spec: 'https://platform.openai.com/docs/models'
} as Links

export default {
	enabled: false,
	api_key: '',
	models: [
		{
			group: '',
			items: [
				{
					enabled: true,
					id: 'gpt-4.1',
					name: 'GPT 4.1',
					features: {
						function_calling: true,
						structured_output: true,
						web_search: true,
						image_input: true
					}
				}
			]
		},
		{
			group: 'GPT 4o',
			items: [
				{
					enabled: true,
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
					enabled: true,
					id: 'gpt-4o-mini',
					name: 'GPT 4o Mini',
					features: {
						function_calling: true,
						structured_output: true,
						web_search: true,
						image_input: true
					}
				}
			]
		},
		{
			group: '',
			items: [
				{
					enabled: true,
					id: 'o4-mini',
					name: 'o4 Mini',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true,
						web_search: true,
						image_input: true
					}
				},
				{
					enabled: true,
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
					enabled: true,
					id: 'o3-mini',
					name: 'o3 Mini',
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
	]
} as Provider
