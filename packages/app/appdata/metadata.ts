import { id } from 'stk/common'

import Baidu from '@/public/images/baidu.svg?react'
import Bing from '@/public/images/bing.svg?react'
import Google from '@/public/images/google.svg?react'

export const email = 'offcial@getanimus.ai'

export const locales = ['en', 'zh-cn'] as const

export const locale_options = [
	{
		label: 'English',
		value: 'en'
	},
	{
		label: '简体中文',
		value: 'zh-cn'
	}
]

export const themes = ['light', 'dark', 'system'] as const

export const engines = [
	{ key: 'google', logo: Google },
	{ key: 'bing', logo: Bing },
	{ key: 'baidu', logo: Baidu }
]

export const preset_config = {
	name: 'Gemini ' + id({ size: 3 }),
	temperature: 0.6,
	top_p: 0.9,
	max_ouput_tokens: 32000,
	system_prompt: 'You are Gemini, an AI assistant created by Google Deepmind.'
}

export const preset_prompts = {}
