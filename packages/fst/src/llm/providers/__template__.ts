import type { Links, Provider } from '@fst/llm'

export const links = {
	website: '',
	api_key: '',
	doc: '',
	model_spec: ''
} as Links

export default {
	enabled: false,
	api_key: '',
	models: {
		'': [
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
} as Provider
