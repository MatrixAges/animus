'use server'

import Negotiator from 'negotiator'
import { cookies, headers } from 'next/headers'

import { match } from '@formatjs/intl-localematcher'
import { default_locale, locales, LOCALE } from '@website/appdata'

import type { App } from '@website/types'

interface ResGetUserLocale {
	locale: App.Locales
	cookie: boolean
}

export const getUserLocale = async () => {
	const cookies_map = await cookies()
	const headers_map = await headers()

	let locale = cookies_map.get(LOCALE)?.value as App.Locales

	if (locale) return { locale, cookie: true } as ResGetUserLocale

	const langs = new Negotiator({
		headers: { 'accept-language': headers_map.get('accept-language')! }
	}).languages()

	return { locale: match(langs, locales, default_locale), cookie: false } as ResGetUserLocale
}

export const setUserLocale = async (locale: App.Locales) => {
	const cookies_map = await cookies()
	const now = new Date()

	cookies_map.set(LOCALE, locale, { expires: now.setFullYear(now.getFullYear() + 3) })
}
