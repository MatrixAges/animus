import dayjs from 'dayjs'
import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'
import { initReactI18next } from 'react-i18next'
import { injectable } from 'tsyringe'

import { Util } from '@/models'
import { getLang, resourcesToBackend, setGlobalAnimation, relaunch } from '@/utils'
import { setStorageWhenChange } from 'stk/mobx'
import { local } from 'stk/storage'

import type { Lang, Theme } from '@/types'

@injectable()
export default class Index {
	lang = 'en' as Lang
	theme = 'light' as Theme
	auto_theme = false
	visible = false
	active = 'general'
	visible_menu = false

	constructor(public util: Util) {
		makeAutoObservable(this, { util: false }, { autoBind: true })

		this.lang = local.lang ?? getLang(navigator.language)

		this.setLocale(this.lang)
		this.setTheme(local.theme || 'light', true)

		// setTimeout(() =>(this.global = container.resolve(Global)), 0)
	}

	init() {
		this.util.acts = [setStorageWhenChange(['lang', 'theme'], this)]

		this.checkTheme()
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

	setTheme(v: Theme, initial?: boolean) {
		const change = () => {
			this.theme = v

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

	off() {
		this.util.off()
	}
}
