import type { CustomProvider, Links } from '@fst/llm'

export const links = {
	website: 'https://cloud.tencent.com/product/tclm',
	api_key: 'https://console.cloud.tencent.com/hunyuan/api-key',
	doc: 'https://cloud.tencent.com/document/product/1729/111007',
	model_spec: 'https://cloud.tencent.com/document/product/1729/104753'
} as Links

export default {
	enabled: false,
	api_key: '',
	api_base_url: '',
	models: {}
} as CustomProvider
