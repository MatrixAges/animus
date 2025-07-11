import * as aliyun_bailian from './providers/aliyun_bailian'
import * as amazon_bedrock from './providers/amazon_bedrock'
import * as anyrouter from './providers/anyrouter'
import * as azure_openai from './providers/azure_openai'
import * as deepseek from './providers/deepseek'
import * as google_gemini from './providers/google_gemini'
import * as openai from './providers/openai'
import * as openrouter from './providers/openrouter'
import * as vercel from './providers/vercel'
import * as xai from './providers/xai'
import { amazon_bedrock_schema, azure_openai_schema, schema } from './schema'

export const providers = {
	google_gemini: {
		links: google_gemini.links,
		config: google_gemini.default,
		schema: schema
	},
	aliyun_bailian: {
		links: aliyun_bailian.links,
		config: aliyun_bailian.default,
		schema: schema
	},
	deepseek: {
		links: deepseek.links,
		config: deepseek.default,
		schema: schema
	},
	openai: {
		links: openai.links,
		config: openai.default,
		schema: schema
	},
	xai: {
		links: xai.links,
		config: xai.default,
		schema: schema
	},
	vercel: {
		links: vercel.links,
		config: vercel.default,
		schema: schema
	},
	azure_openai: {
		links: azure_openai.links,
		config: azure_openai.default,
		schema: azure_openai_schema
	},
	amazon_bedrock: {
		links: amazon_bedrock.links,
		config: amazon_bedrock.default,
		schema: amazon_bedrock_schema
	},
	openrouter: {
		links: openrouter.links,
		config: openrouter.default,
		schema: schema
	},
	anyrouter: {
		links: anyrouter.links,
		config: anyrouter.default,
		schema: schema
	}
}

export * from './schema'
export * from './types'
