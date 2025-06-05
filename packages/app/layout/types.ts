import { Setting } from '@/models'

export interface IPropsSidebar {
	lang: Setting['lang']
	theme: Setting['theme']
	setLang: Setting['setLang']
	setTheme: Setting['setTheme']
}

export interface IPropsHeader {
	toggleFold: () => void
}
