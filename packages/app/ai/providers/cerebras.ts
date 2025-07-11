import type { Links, Provider } from '@/ai'

export const links = {
	website: 'https://cerebras.ai',
	api_key: 'https://cloud.cerebras.ai',
	doc: 'https://inference-docs.cerebras.ai/quickstart',
	model_spec: 'https://inference-docs.cerebras.ai/models/llama-4-scout'
} as Links

export default {
	enabled: false,
	api_key: '',
	models: {
		Llama: [
			{
				enabled: true,
				id: 'llama4-scout',
				name: 'Llama 4 Scout',
				features: {
					function_calling: true,
					structured_output: true
				}
			},
			{
				enabled: true,
				id: 'llama3.1-8b',
				name: 'Llama 3.1 8B',
				features: {
					function_calling: true,
					structured_output: true
				}
			},
			{
				enabled: true,
				id: 'llama3.3-70b',
				name: 'Llama 3.3 70B',
				features: {
					function_calling: true,
					structured_output: true
				}
			}
		],
		Qwen3: [
			{
				enabled: true,
				id: 'qwen-3-32b',
				name: 'Qwen 3 32B',
				features: {
					function_calling: true,
					structured_output: true
				}
			}
		]
	}
} as Provider
