export const links = {
	website: 'https://v0.dev',
	api_key: 'https://v0.dev',
	doc: 'https://v0.dev/docs/introduction',
	model_spec: 'https://v0.dev/docs/v0-model-api'
}
export default {
	enabled: false,
	api_key: '',
	models: {
		'': [
			{
				enabled: true,
				id: 'v0-1.5-md',
				name: 'V0 1.5 MD',
				features: {
					function_calling: true,
					structured_output: true,
					image_input: true
				}
			},
			{
				enabled: true,
				id: 'v0-1.5-lg',
				name: 'V0 1.5 LG',
				features: {
					function_calling: true,
					structured_output: true,
					image_input: true
				}
			},
			{
				enabled: true,
				id: 'v0-1.0-md',
				name: 'V0 1.0- MD',
				features: {
					function_calling: true,
					structured_output: true,
					image_input: true
				}
			}
		]
	}
}
