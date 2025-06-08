import { app } from 'electron'
import i18next from 'i18next'

import { conf } from './'

import type { Lang } from '@app/types'

const conf_lang = await conf.get('lang')
const sys_lang = app.getLocale().indexOf('zh') !== -1 ? 'zh-cn' : 'en'
const lang = (conf_lang || sys_lang) as Lang

const { default: locale } = await import(`./locales/${lang}`)

i18next.init({
	initAsync: false,
	lng: lang,
	fallbackLng: lang,
	load: 'currentOnly',
	returnObjects: true,
	resources: { [lang]: locale }
})
