import type { Links, Provider } from '@fst/llm'

export const links = {
	website: '',
	api_key: '',
	doc: '',
	model_spec: ''
} as Links

export const config = {
	enabled: false,
	api_key: '',
	models: [
		{
			group: '',
			items: [
				{
					enabled: true,
					id: '',
					name: '',
					features: {
						function_calling: true,
						structured_output: true
					}
				}
			]
		}
	]
} as Provider
