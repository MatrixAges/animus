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
