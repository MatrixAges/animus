import type { Links, Provider } from '@fst/llm'

export const links = {
	website: 'https://groq.com',
	api_key: 'https://console.groq.com/keys',
	doc: 'https://console.groq.com/docs/quickstart',
	model_spec: 'https://console.groq.com/docs/models'
} as Links

export default {
	enabled: false,
	api_key: '',
	models: {
		Llama: [
			{
				enabled: true,
				id: 'meta-llama/llama-4-scout-17b-16e-instruct',
				name: 'Llama 4',
				features: {
					function_calling: true,
					structured_output: true,
					image_input: true
				}
			},
			{
				enabled: true,
				id: 'llama-3.3-70b-versatile',
				name: 'Llama 3',
				features: {
					function_calling: true,
					structured_output: true
				}
			}
		],
		Deepseek: [
			{
				enabled: true,
				id: 'deepseek-r1-distill-qwen-32b',
				name: 'Deepseek R1 Distill (Qwen 32B)',
				features: {
					function_calling: true,
					structured_output: true
				}
			},
			{
				enabled: true,
				id: 'deepseek-r1-distill-llama-70b',
				name: 'Deepseek R1 Distill (Llama 70B)',
				features: {
					function_calling: true,
					structured_output: true
				}
			}
		]
	}
} as Provider
