'use server'

import { cookies } from 'next/headers'

import { THEME } from '@website/appdata'

import type { App } from '@website/types'

interface ResGetUserLocale {
	theme: App.Theme
	cookie: boolean
}

export const getUserTheme = async () => {
	const cookies_map = await cookies()

	const theme = cookies_map.get(THEME)?.value

	if (theme) return { theme, cookie: true } as ResGetUserLocale

	return { theme: 'light', cookie: false } as ResGetUserLocale
}

export const setUserTheme = async (v: App.Theme) => {
	const cookies_map = await cookies()
	const now = new Date()

	cookies_map.set(THEME, v, { expires: now.setFullYear(now.getFullYear() + 3) })
}
