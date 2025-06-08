import { getAppPath, getPath, is_dev, is_win, show_devtool } from '@electron/utils'

import type { BrowserWindowConstructorOptions } from 'electron'

export const common_window_web_preferences = {
	enableWebSQL: false,
	spellcheck: false,
	preload: getPath('load/preload.js')
} as BrowserWindowConstructorOptions['webPreferences']

export const common_window_options = {
	frame: false,
	fullscreen: false,
	transparent: true,
	autoHideMenuBar: true,
	titleBarStyle: 'hidden',
	width: 1080,
	height: 681,
	minWidth: 720,
	minHeight: 445,
	trafficLightPosition: { x: 9, y: 10 },
	webPreferences: {
		...common_window_web_preferences,
		devTools: show_devtool
	}
} as BrowserWindowConstructorOptions

if (is_win) {
	common_window_options['transparent'] = false
}

export default {
	windowOptions: {
		title: 'IF',
		icon: getPath('assets/logo/logo.png'),
		...common_window_options
	} as BrowserWindowConstructorOptions,
	windowUrl: is_dev ? 'http://localhost:8080' : `file://${getAppPath('index.html')}`,
	loadingUrl: `file://${getPath('load/loading.html')}`,
	dockIconPath: getPath('assets/logo/logo.png'),
	getTrayIcon: (dark?: boolean) => getPath(`assets/icons/tray/logo.png`)
}
