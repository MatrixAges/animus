export const links = {
	website: 'https://aws.amazon.com/bedrock/',
	api_key: 'https://console.aws.amazon.com/bedrock',
	doc: 'https://docs.aws.amazon.com/bedrock/',
	model_spec: 'https://docs.aws.amazon.com/bedrock/latest/userguide/foundation-models-reference.html'
}
export default {
	enabled: false,
	region: 'us-east-1',
	accessKeyId: '',
	secretAccessKey: '',
	sessionToken: '',
	models: {
		Amazon: [
			{
				enabled: true,
				id: 'amazon.nova-pro-v1:0',
				name: 'Amazon Nova Pro',
				features: {
					function_calling: true,
					structured_output: true,
					image_input: true
				}
			},
			{
				enabled: true,
				id: 'amazon.nova-lite-v1:0',
				name: 'Amazon Nova Lite',
				features: {
					function_calling: true,
					structured_output: true,
					image_input: true
				}
			},
			{
				enabled: true,
				id: 'amazon.nova-micro-v1:0',
				name: 'Amazon Nova Micro',
				features: {
					function_calling: true,
					structured_output: true
				}
			}
		],
		Claude: [
			{
				enabled: true,
				id: 'anthropic.claude-4-opus-20250514-v1:0',
				name: 'Claude 4 Opus',
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
				id: 'anthropic.claude-4-sonnet-20250514-v1:0',
				name: 'Claude 4 Sonnet',
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
				id: 'anthropic.claude-3-7-sonnet-20250219-v1:0',
				name: 'Claude 3.7 Sonnet',
				features: {
					function_calling: true,
					structured_output: true,
					web_search: true,
					image_input: true
				}
			},
			{
				enabled: true,
				id: 'anthropic.claude-3-5-haiku-20241022-v1:0',
				name: 'Claude 3.5 Haiku',
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
