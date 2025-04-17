import { useMemoizedFn } from 'ahooks'

import { THEME } from '@website/appdata'
import { setUserTheme } from '@website/services'

import useCookie from './useCookie'

import type { App } from '@website/types'

export default () => {
	const [theme, setThemeCookie] = useCookie(THEME)

	const setTheme = useMemoizedFn((v: App.Theme) => {
		const change = () => {
			setThemeCookie(v)
			setUserTheme(v)
		}

		if (document?.startViewTransition) {
			document.startViewTransition(change)
		} else {
			change()
		}
	})

	return { theme: theme || 'light', setTheme } as { theme: App.Theme; setTheme: typeof setTheme }
}
