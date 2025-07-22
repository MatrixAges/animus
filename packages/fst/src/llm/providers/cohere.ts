import type { Links, Provider } from '@fst/llm'

export const links = {
	website: 'https://cohere.com',
	api_key: 'https://dashboard.cohere.com/api-keys',
	doc: 'https://docs.cohere.com',
	model_spec: 'https://docs.cohere.com/docs/models'
} as Links

export default {
	enabled: false,
	api_key: '',
	models: {
		'': [
			{
				enabled: true,
				id: 'command-a-03-2025',
				name: 'Command A 032025',
				features: {
					function_calling: true,
					structured_output: true
				}
			},
			{
				enabled: true,
				id: 'command-r7b-12-2024',
				name: 'Command R 7B',
				features: {
					function_calling: true,
					structured_output: true
				}
			},
			{
				enabled: true,
				id: 'command-r-plus-04-2024',
				name: 'Command R Plus 042024',
				features: {
					function_calling: true,
					structured_output: true
				}
			},
			{
				enabled: true,
				id: 'command-r-plus',
				name: 'Command R Plus',
				features: {
					function_calling: true,
					structured_output: true
				}
			}
		]
	}
} as Provider
