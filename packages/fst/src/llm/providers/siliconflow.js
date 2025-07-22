export const links = {
	website: 'https://www.siliconflow.cn/',
	api_key: 'https://cloud.siliconflow.cn/sft-d1oggoj3jrms73brdfsg/account/ak',
	doc: 'https://docs.siliconflow.cn/cn/userguide/introduction',
	model_spec: 'https://cloud.siliconflow.cn/sft-d1oggoj3jrms73brdfsg/models'
}
export default {
	enabled: false,
	api_key: '',
	api_base_url: '',
	models: {
		Deepseek: [
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
		],
		THUDM: [
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
					reasoning: true
				}
			}
		],
		Baai: [
			{
				enabled: true,
				id: 'BAAI/bge-m3',
				name: 'Bge M3',
				features: {
					embedding: true
				}
			},
			{
				enabled: true,
				id: 'BAAI/bge-reranker-v2-m3',
				name: 'Bge Reranker',
				features: {
					reranking: true
				}
			}
		]
	}
}
