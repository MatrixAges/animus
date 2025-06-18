import dayjs from 'dayjs'
import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'
import { initReactI18next } from 'react-i18next'
import { injectable } from 'tsyringe'
import { Util } from '@/models'
import {
	getLang,
	resourcesToBackend,
	setGlobalAnimation,
	relaunch,
	ipc,
	is_electron,
	theme_match_media,
	getSystemTheme
} from '@/utils'
import { setStorageWhenChange } from 'stk/mobx'
import { local } from 'stk/storage'

import type { Lang, Theme } from '@/types'

@injectable()
export default class Index {
	lang = 'en' as Lang
	theme = 'system' as Theme
	auto_theme = false
	glass = true
	visible = false
	active = 'general'
	visible_menu = false

	constructor(public util: Util) {
		makeAutoObservable(this, { util: false }, { autoBind: true })

		this.lang = local.lang ?? getLang(navigator.language)

		this.setLocale(this.lang)
		this.setTheme(local.theme || 'system', true)
		this.setGlass(local.glass ?? true)

		// setTimeout(() =>(this.global = container.resolve(Global)), 0)
	}

	init() {
		this.util.acts = [setStorageWhenChange(['lang', 'theme', 'glass'], this)]

		this.checkTheme()
		this.on()
	}

	setLocale(lang: Lang) {
		i18next
			.use(resourcesToBackend)
			.use(initReactI18next)
			.init({
				lng: this.lang,
				fallbackLng: 'en',
				load: 'currentOnly',
				returnObjects: true,
				interpolation: { escapeValue: false }
			})

		import(`@/locales/dayjs/${lang}`).then(res => dayjs.locale(lang, res.default))
	}

	setLang(lang: Lang) {
		if (lang === this.lang) return

		this.lang = lang
		local.lang = lang

		relaunch()
	}

	getSystemTheme(v: Theme) {
		this.offThemeChange()

		if (v !== 'system') return v

		const theme = getSystemTheme()

		this.onThemeChange()

		return theme
	}

	handleThemeChange(e: MediaQueryListEvent) {
		this.setTheme(e.matches ? 'dark' : 'light')
	}

	onThemeChange() {
		theme_match_media.addEventListener('change', this.handleThemeChange)
	}

	offThemeChange() {
		theme_match_media.removeEventListener('change', this.handleThemeChange)
	}

	setTheme(v: Theme, initial?: boolean) {
		const theme = this.getSystemTheme(v)

		const change = () => {
			this.theme = v

			document.documentElement.setAttribute('data-theme', theme)
			document.documentElement.style.colorScheme = theme
		}

		if (!initial) {
			setGlobalAnimation()

			document.startViewTransition(change)
		} else {
			change()
		}

		if (is_electron) ipc.app.setTheme.mutate({ theme: v })
	}

	toggleAutoTheme() {
		this.auto_theme = !this.auto_theme

		this.checkTheme()
	}

	checkTheme() {
		if (!this.auto_theme) return

		const hour = dayjs().hour()

		this.setTheme(hour >= 6 && hour < 18 ? 'light' : 'dark')
	}

	setGlass(v: Index['glass']) {
		this.glass = v

		if (this.glass) {
			document.documentElement.setAttribute('data-glass', '1')
		} else {
			document.documentElement.removeAttribute('data-glass')
		}
	}

	toggleSetting() {
		this.visible = !this.visible
	}

	on() {
		$app.Event.on('app.toggleSetting', this.toggleSetting)
	}

	off() {
		this.offThemeChange()

		this.util.off()

		$app.Event.off('app.toggleSetting', this.toggleSetting)
	}
}
