import { useMemo } from 'react'

import {
	AlibabaCloud,
	Anthropic,
	Azure,
	Bedrock,
	Cerebras,
	Cohere,
	DeepInfra,
	DeepSeek,
	Fireworks,
	Gemini,
	Grok,
	Groq,
	Hunyuan,
	LmStudio,
	Mistral,
	Ollama,
	OpenAI,
	OpenRouter,
	Perplexity,
	SiliconCloud,
	Together,
	V0,
	Volcengine,
	Zhipu
} from '@lobehub/icons'
import { BoulesIcon, RobotIcon } from '@phosphor-icons/react'

import type { IconType } from '@lobehub/icons'
import type { Icon } from '@phosphor-icons/react'
import type { ProviderKey } from 'fst/llm'

export const module_icon = {
	google_gemini: Gemini,
	aliyun_bailian: AlibabaCloud,
	amazon_bedrock: Bedrock,
	anthropic: Anthropic,
	azure_openai: Azure,
	cerebras: Cerebras,
	cohere: Cohere,
	deepinfra: DeepInfra,
	deepseek: DeepSeek,
	fireworks: Fireworks,
	groq: Groq,
	lmstudio: LmStudio,
	mistral: Mistral,
	ollama: Ollama,
	openai: OpenAI,
	openai_compatible: BoulesIcon,
	openrouter: OpenRouter,
	perplexity: Perplexity,
	siliconflow: SiliconCloud,
	tencent_hunyuan: Hunyuan,
	together: Together,
	vercel: V0,
	volcengine: Volcengine,
	xai: Grok,
	zhipu: Zhipu
} as Record<ProviderKey, IconType | Icon>

interface IProps {
	name: string
	color?: string
	size?: string | number
}

const Index = ({ name, ...props }: IProps) => {
	const Icon = useMemo(() => (name in module_icon ? module_icon[name as ProviderKey] : RobotIcon), [name])

	return <Icon {...props}></Icon>
}

export default $app.memo(Index)
