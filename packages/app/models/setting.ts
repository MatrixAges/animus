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
	getSystemTheme,
	conf,
	set_store_options
} from '@/utils'
import { setStoreWhenChange } from 'stk/mobx'
import { commands, config_keys } from '@/appdata'

import type { Lang, Theme } from '@/types'

const { lang, theme_source, glass } = config_keys

@injectable()
export default class Index {
	lang = 'en' as Lang
	theme_source = 'system' as Theme
	theme_value = 'light' as Exclude<Theme, 'system'>
	auto_theme = false
	glass = true
	visible = false
	active = 'general'
	visible_menu = false

	constructor(public util: Util) {
		makeAutoObservable(this, { util: false }, { autoBind: true })
	}

	async init() {
		const off = await setStoreWhenChange([lang, theme_source, glass], this, set_store_options)

		this.util.acts = [off]

		await this.setLocale(this.lang ?? getLang(navigator.language))

		this.setTheme(this.theme_source || 'system', true)
		this.setGlass(this.glass ?? true)

		this.checkTheme()
		this.on()
	}

	async setLocale(lang: Lang) {
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

		const res = await import(`@/locales/dayjs/${lang}`)

		dayjs.locale(lang, res.default)
	}

	setLang(lang: Lang) {
		if (lang === this.lang) return

		this.lang = lang

		conf.set('lang', lang)

		relaunch()
	}

	handleThemeChange(e: MediaQueryListEvent) {
		this.setThemeValue(e.matches ? 'dark' : 'light')
	}

	onThemeChange() {
		this.offThemeChange()

		theme_match_media.addEventListener('change', this.handleThemeChange)
	}

	offThemeChange() {
		theme_match_media.removeEventListener('change', this.handleThemeChange)
	}

	async setTheme(v: Index['theme_source'], initial?: boolean) {
		if (is_electron) await ipc.app.setTheme.mutate({ theme: v })

		if (v === 'system') {
			this.onThemeChange()
		} else {
			this.offThemeChange()
		}

		this.theme_source = v

		this.setThemeValue(v !== 'system' ? v : getSystemTheme(), initial)
	}

	setThemeValue(v: Index['theme_value'], initial?: boolean) {
		if (v === this.theme_value) return

		const change = () => {
			this.theme_value = v

			document.documentElement.setAttribute('data-theme', v)
			document.documentElement.style.colorScheme = v
		}

		if (!initial) {
			setGlobalAnimation()

			document.startViewTransition(change)
		} else {
			change()
		}
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

		if (is_electron) ipc.app.setGlass.mutate({ glass: v })
	}

	toggleSetting() {
		this.visible = !this.visible
	}

	on() {
		$app.Event.on(commands['app.toggleSetting'], this.toggleSetting)
	}

	off() {
		this.offThemeChange()

		this.util.off()

		$app.Event.off(commands['app.toggleSetting'], this.toggleSetting)
	}
}
