import type { Links, Provider } from '@fst/llm'

export const links = {
	website: 'https://open.bigmodel.cn',
	api_key: 'https://open.bigmodel.cn/usercenter/apikeys',
	doc: 'https://open.bigmodel.cn/dev/howuse/introduction',
	model_spec: 'https://open.bigmodel.cn/dev/howuse/model'
} as Links

export default {
	enabled: false,
	api_key: '',
	models: {}
} as Provider
