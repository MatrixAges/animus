export const links = {
	website: 'https://mistral.ai',
	api_key: 'https://console.mistral.ai/api-keys/',
	doc: 'https://docs.mistral.ai/',
	model_spec: 'https://docs.mistral.ai/getting-started/models/models_overview'
}
export default {
	enabled: false,
	api_key: '',
	models: {
		'': [
			{
				enabled: true,
				id: 'pixtral-large-latest',
				name: 'Pixtral Large (latest)',
				features: {
					function_calling: true,
					structured_output: true,
					image_input: true
				}
			},
			{
				enabled: true,
				id: 'pixtral-12b-2409',
				name: 'Pixtral 12B 2409',
				features: {
					function_calling: true,
					structured_output: true,
					image_input: true
				}
			},
			{
				enabled: true,
				id: 'mistral-large-latest',
				name: 'Mistral Large (latest)',
				features: {
					function_calling: true,
					structured_output: true
				}
			},
			{
				enabled: true,
				id: 'mistral-small-latest',
				name: 'Mistral Small (latest)',
				features: {
					function_calling: true,
					structured_output: true
				}
			},
			{
				enabled: true,
				id: 'ministral-3b-latest',
				name: 'Ministral 3B (latest)',
				features: {
					function_calling: true,
					structured_output: true
				}
			},
			{
				enabled: true,
				id: 'ministral-8b-latest',
				name: 'Ministral 8B (latest)',
				features: {
					function_calling: true,
					structured_output: true
				}
			}
		]
	}
}
