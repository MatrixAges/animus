import type { CustomProvider, Links } from '@fst/llm'

export const links = {
	website: 'https://www.siliconflow.cn/',
	api_key: 'https://cloud.siliconflow.cn/sft-d1oggoj3jrms73brdfsg/account/ak',
	doc: 'https://docs.siliconflow.cn/cn/userguide/introduction',
	model_spec: 'https://cloud.siliconflow.cn/sft-d1oggoj3jrms73brdfsg/models'
} as Links

export const config = {
	enabled: false,
	api_key: '',
	api_base_url: '',
	models: [
		{
			group: 'Deepseek',
			items: [
				{
					enabled: true,
					id: 'deepseek-ai/DeepSeek-R1-0528-Qwen3-8B',
					name: 'Qwen3 8B Distill (DeepSeek R1 0528)',
					features: {
						reasoning: true
					}
				},
				{
					enabled: true,
					id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
					name: 'Qwen 7B Distill (DeepSeek R1)',
					features: {
						function_calling: true,
						structured_output: true,
						reasoning: true
					}
				}
			]
		},
		{
			group: 'THUDM',
			items: [
				{
					enabled: true,
					id: 'THUDM/GLM-4.1V-9B-Thinking',
					name: 'GLM 4.1V 9B Thinking',
					features: {
						image_input: true
					}
				},
				{
					enabled: true,
					id: 'THUDM/GLM-Z1-9B-0414',
					name: 'GLM Z1 9B 0414',
					features: {
						function_calling: true,
						structured_output: true,
						image_input: true
					}
				}
			]
		}
	]
} as CustomProvider
