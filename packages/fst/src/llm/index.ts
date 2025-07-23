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
import {
	amazon_bedrock_schema,
	azure_openai_schema,
	custom_schema,
	ollama_schema,
	openai_compatible_schema,
	schema
} from './schema'

export const providers = {
	google_gemini: {
		links: google_gemini.links,
		config: google_gemini.default,
		schema: schema
	},
	aliyun_bailian: {
		links: aliyun_bailian.links,
		config: aliyun_bailian.default,
		schema: custom_schema
	},
	amazon_bedrock: {
		links: amazon_bedrock.links,
		config: amazon_bedrock.default,
		schema: amazon_bedrock_schema
	},
	anthropic: {
		links: anthropic.links,
		config: anthropic.default,
		schema: schema
	},
	azure_openai: {
		links: azure_openai.links,
		config: azure_openai.default,
		schema: azure_openai_schema
	},
	cerebras: {
		links: cerebras.links,
		config: cerebras.default,
		schema: schema
	},
	cohere: {
		links: cohere.links,
		config: cohere.default,
		schema: schema
	},
	deepinfra: {
		links: deepinfra.links,
		config: deepinfra.default,
		schema: schema
	},
	deepseek: {
		links: deepseek.links,
		config: deepseek.default,
		schema: schema
	},
	fireworks: {
		links: fireworks.links,
		config: fireworks.default,
		schema: schema
	},
	groq: {
		links: groq.links,
		config: groq.default,
		schema: schema
	},
	lmstudio: {
		links: lmstudio.links,
		config: lmstudio.default,
		schema: custom_schema
	},
	mistral: {
		links: mistral.links,
		config: mistral.default,
		schema: schema
	},
	ollama: {
		links: ollama.links,
		config: ollama.default,
		schema: ollama_schema
	},
	openai: {
		links: openai.links,
		config: openai.default,
		schema: schema
	},
	openrouter: {
		links: openrouter.links,
		config: openrouter.default,
		schema: schema
	},
	perplexity: {
		links: perplexity.links,
		config: perplexity.default,
		schema: schema
	},
	siliconflow: {
		links: siliconflow.links,
		config: siliconflow.default,
		schema: custom_schema
	},
	tencent_hunyuan: {
		links: tencent_hunyuan.links,
		config: tencent_hunyuan.default,
		schema: custom_schema
	},
	together: {
		links: together.links,
		config: together.default,
		schema: schema
	},
	vercel: {
		links: vercel.links,
		config: vercel.default,
		schema: schema
	},
	volcengine: {
		links: volcengine.links,
		config: volcengine.default,
		schema: custom_schema
	},
	xai: {
		links: xai.links,
		config: xai.default,
		schema: schema
	},
	zhipu: {
		links: zhipu.links,
		config: zhipu.default,
		schema: schema
	},
	openai_compatible: {
		links: openai_compatible.links,
		config: openai_compatible.default,
		schema: openai_compatible_schema
	}
}

export type ProviderKey = keyof typeof providers

export * from './metadata'
export * from './schema'
export * from './types'
