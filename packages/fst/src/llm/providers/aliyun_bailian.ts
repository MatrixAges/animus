import type { CustomProvider, Links } from '@fst/llm'

export const links = {
	website: 'https://bailian.console.aliyun.com/#/home',
	api_key: 'https://bailian.console.aliyun.com/?tab=model#/api-key',
	doc: 'https://bailian.console.aliyun.com/?tab=doc#/doc',
	model_spec: 'https://bailian.console.aliyun.com/?tab=model#/model-market'
} as Links

export default {
	enabled: false,
	api_key: '',
	api_base_url: '',
	models: {
		Qwen: [
			{
				enabled: true,
				id: 'qwen-plus',
				name: 'Qwen Plus',
				features: {
					function_calling: true,
					structured_output: true,
					reasoning: true,
					web_search: true
				}
			},
			{
				enabled: true,
				id: 'qwen-turbo',
				name: 'Qwen Turbo',
				features: {
					function_calling: true,
					structured_output: true,
					reasoning: true,
					web_search: true
				}
			},
			{
				enabled: true,
				id: 'qwen-max',
				name: 'Qwen Max',
				features: {
					function_calling: true,
					structured_output: true,
					web_search: true,
					reasoning: true,
					reasoning_optional: true
				}
			}
		],
		Deepseek: [
			{
				enabled: true,
				id: 'deepseek-r1-0528',
				name: 'Deepseek R1 0528',
				features: {
					function_calling: true,
					structured_output: true,
					reasoning: true
				}
			},
			{
				enabled: true,
				id: 'deepseek-r1',
				name: 'Deepseek R1',
				features: {
					reasoning: true
				}
			},
			{
				enabled: true,
				id: 'deepseek-v3',
				name: 'Deepseek V3',
				features: {
					function_calling: true,
					structured_output: true
				}
			}
		]
	}
} as CustomProvider
