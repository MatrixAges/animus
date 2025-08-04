import * as aliyun_bailian from './providers/aliyun_bailian'
import * as amazon_bedrock from './providers/amazon_bedrock'
import * as anthropic from './providers/anthropic'
import * as azure_openai from './providers/azure_openai'
import * as cerebras from './providers/cerebras'
import * as cohere from './providers/cohere'
import * as deepinfra from './providers/deepinfra'
import * as deepseek from './providers/deepseek'
import * as fireworks from './providers/fireworks'
import * as google_gemini from './providers/google_gemini'
import * as groq from './providers/groq'
import * as lmstudio from './providers/lmstudio'
import * as mistral from './providers/mistral'
import * as ollama from './providers/ollama'
import * as openai from './providers/openai'
import * as openai_compatible from './providers/openai_compatible'
import * as openrouter from './providers/openrouter'
import * as perplexity from './providers/perplexity'
import * as siliconflow from './providers/siliconflow'
import * as tencent_hunyuan from './providers/tencent_hunyuan'
import * as together from './providers/together'
import * as vercel from './providers/vercel'
import * as volcengine from './providers/volcengine'
import * as xai from './providers/xai'
import * as zhipu from './providers/zhipu'
import { amazon_bedrock_schema, azure_openai_schema, custom_schema, ollama_schema } from './schema'

export const providers = {
	google_gemini,
	anthropic,
	cerebras,
	cohere,
	deepinfra,
	deepseek,
	fireworks,
	groq,
	lmstudio,
	mistral,
	ollama,
	openai,
	openrouter,
	perplexity,
	siliconflow,
	together,
	vercel,
	xai,
	zhipu,
	aliyun_bailian,
	tencent_hunyuan,
	volcengine,
	azure_openai,
	amazon_bedrock,
	openai_compatible
}

export const providers_schema = {
	lmstudio: custom_schema,
	ollama: ollama_schema,
	siliconflow: custom_schema,
	aliyun_bailian: custom_schema,
	tencent_hunyuan: custom_schema,
	volcengine: custom_schema,
	azure_openai: azure_openai_schema,
	amazon_bedrock: amazon_bedrock_schema,
	openai_compatible: custom_schema
}

export type ProviderKey = keyof typeof providers

export * from './metadata'
export * from './schema'
export * from './types'
