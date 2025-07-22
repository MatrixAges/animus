export const links = {
	website: 'https://azure.microsoft.com/en-us/products/ai-services/openai-service',
	api_key: 'https://portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/~/OpenAI',
	doc: 'https://learn.microsoft.com/en-us/azure/ai-foundry/',
	model_spec: 'https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/models'
}
export default {
	enabled: false,
	resourceName: '',
	api_key: '',
	api_version: '2024-10-01-preview',
	models: {
		'': [
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
		],
		'GPT 4o': [
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
	}
}
