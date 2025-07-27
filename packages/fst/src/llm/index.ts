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
	google_gemini: {
		links: google_gemini.links,
		config: google_gemini.default
	},
	anthropic: {
		links: anthropic.links,
		config: anthropic.default
	},
	cerebras: {
		links: cerebras.links,
		config: cerebras.default
	},
	cohere: {
		links: cohere.links,
		config: cohere.default
	},
	deepinfra: {
		links: deepinfra.links,
		config: deepinfra.default
	},
	deepseek: {
		links: deepseek.links,
		config: deepseek.default
	},
	fireworks: {
		links: fireworks.links,
		config: fireworks.default
	},
	groq: {
		links: groq.links,
		config: groq.default
	},
	lmstudio: {
		links: lmstudio.links,
		config: lmstudio.default
	},
	mistral: {
		links: mistral.links,
		config: mistral.default
	},
	ollama: {
		links: ollama.links,
		config: ollama.default
	},
	openai: {
		links: openai.links,
		config: openai.default
	},
	openrouter: {
		links: openrouter.links,
		config: openrouter.default
	},
	perplexity: {
		links: perplexity.links,
		config: perplexity.default
	},
	siliconflow: {
		links: siliconflow.links,
		config: siliconflow.default
	},
	together: {
		links: together.links,
		config: together.default
	},
	vercel: {
		links: vercel.links,
		config: vercel.default
	},
	xai: {
		links: xai.links,
		config: xai.default
	},
	zhipu: {
		links: zhipu.links,
		config: zhipu.default
	},
	aliyun_bailian: {
		links: aliyun_bailian.links,
		config: aliyun_bailian.default
	},
	tencent_hunyuan: {
		links: tencent_hunyuan.links,
		config: tencent_hunyuan.default
	},
	volcengine: {
		links: volcengine.links,
		config: volcengine.default
	},
	azure_openai: {
		links: azure_openai.links,
		config: azure_openai.default
	},
	amazon_bedrock: {
		links: amazon_bedrock.links,
		config: amazon_bedrock.default
	},
	openai_compatible: {
		links: openai_compatible.links,
		config: openai_compatible.default
	}
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
