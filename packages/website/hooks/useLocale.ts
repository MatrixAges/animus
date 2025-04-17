import { useMemoizedFn } from 'ahooks'

import { LOCALE } from '@website/appdata'
import { setUserLocale } from '@website/services'

import useCookie from './useCookie'

import type { App } from '@website/types'

export default () => {
	const [locale, setLocaleCookie] = useCookie(LOCALE)

	const setLocale = useMemoizedFn((v: App.Locales) => {
		setLocaleCookie(v)
		setUserLocale(v)

		if (window.__search_index__) {
			// @ts-ignore
			window.__search_index__ = null
		}
	})

	return { locale: locale as App.Locales, setLocale }
}
