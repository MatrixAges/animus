import dayjs from 'dayjs'
import i18next from 'i18next'
import { makeAutoObservable } from 'mobx'
import { initReactI18next } from 'react-i18next'
import { injectable } from 'tsyringe'

import { Util } from '@/models'
import { getLang, resourcesToBackend, setGlobalAnimation, relaunch, ipc, is_electron, info } from '@/utils'
import { setStorageWhenChange } from 'stk/mobx'
import { local } from 'stk/storage'

import type { Lang, Theme, UpdateState } from '@/types'

@injectable()
export default class Index {
	lang = 'en' as Lang
	theme = 'light' as Theme
	auto_theme = false
	fold = false
	visible = false
	active = 'general'
	visible_menu = false
	update_silence = true
	update_status = null as UpdateState

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

		if (is_electron) {
			this.onAppUpdate()
			this.checkUpdate(true)
		}
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

	onAppUpdate() {
		ipc.app.update.subscribe(undefined, {
			onData: args => {
				switch (args.type) {
					case 'can_update':
						this.update_status = { type: 'has_update', version: args.value }
						break
					case 'cant_update':
						if (!this.update_silence) $message.info($t('setting.general.update.no_update'))

						break
					case 'progress':
						this.update_status = { type: 'downloading', percent: args.value }

						break
					case 'downloaded':
						this.update_status = { type: 'downloaded' }

						break
				}
			}
		})
	}

	checkUpdate(silence?: boolean) {
		if (!silence) this.update_silence = false

		ipc.app.checkUpdate.query()
	}

	install() {
		ipc.app.install.query()
	}

	async download() {
		await info({
			title: $t('notice'),
			content: $t('setting.general.update.install_backup'),
			zIndex: 300000
		})

		ipc.app.download.query()
	}

	off() {
		this.util.off()
	}
}
