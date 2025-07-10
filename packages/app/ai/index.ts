import aliyun_bailian from './providers/aliyun_bailian'
import deepseek from './providers/deepseek'
import google_gemini from './providers/google_gemini'
import openai from './providers/openai'
import vercel from './providers/vercel'
import xai from './providers/xai'

export const providers = {
	google_gemini,
	openai,
	vercel,
	xai,
	aliyun_bailian,
	deepseek
}

export * from './schema'
