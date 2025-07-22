import type { Links, Provider } from '@fst/llm'

export const links = {
	website: 'https://deepinfra.com',
	api_key: 'https://deepinfra.com/dash/api_keys',
	doc: 'https://deepinfra.com/docs',
	model_spec: 'https://deepinfra.com/models'
} as Links

export default {
	enabled: false,
	api_key: '',
	models: {
		Llama: [
			{
				enabled: true,
				id: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8',
				name: 'Llama 4 Maverick',
				features: {
					image_input: true
				}
			},
			{
				enabled: true,
				id: 'meta-llama/Llama-4-Scout-17B-16E-Instruct',
				name: 'Llama 4 Scout',
				features: {
					image_input: true
				}
			},
			{
				enabled: true,
				id: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
				name: 'Llama 3 Turbo',
				features: {
					function_calling: true,
					structured_output: true
				}
			}
		],
		Qwen: [
			{
				enabled: true,
				id: 'Qwen/Qwen2.5-72B-Instruct',
				name: 'Qwen 2.5 72B',
				features: {
					function_calling: true,
					structured_output: true
				}
			}
		]
	}
} as Provider
