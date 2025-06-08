import { app, BrowserWindow, ipcMain, shell, WebContentsView } from 'electron'
import { createIPCHandler } from 'electron-trpc/main'

import '@desktop/utils/locale'

import { emitter_verify, verify } from '@desktop/services'

import config from '../config'
import { Main, Menu, Tray } from './controls'
import { routers } from './rpcs'
import { conf, is_mac, show_devtool } from './utils'

import type { Tray as TrayType } from 'electron'

if (!app.requestSingleInstanceLock()) app.exit()

app.commandLine.appendSwitch('lang', 'en-US')

class App {
	private window: BrowserWindow | null
	private loading_view: WebContentsView | null
	private tray: TrayType | null

	constructor() {
		this.window = null
		this.loading_view = null
		this.tray = null
	}

	async init() {
		this.register()
	}

	register() {
		app.whenReady().then(async () => {
			this.window = new Main()
			this.loading_view = new WebContentsView()
			this.tray = new Tray(this.window).get()

			const win_bounds = conf.get('win_bounds')

			if (win_bounds) this.window.setBounds(win_bounds)

			this.load()
			this.events()

			createIPCHandler({
				createContext: async () => ({ win: this.window!, tray: this.tray! }),
				router: routers,
				windows: [this.window]
			})
		})

		app.on('before-quit', () => {
			this.tray?.destroy()
			this.window?.destroy()

			this.off()
		})

		if (is_mac) this.macOSHandler()
	}

	load() {
		const window = this.window!
		const loading_view = this.loading_view!
		const { width, height } = window.getBounds()
		const bg_color_load = conf.get('bg_color_load') as string

		window.contentView.addChildView(loading_view)

		loading_view.setBackgroundColor(bg_color_load || 'red')
		loading_view.setBounds({ x: 0, y: 0, width, height })
		loading_view.webContents.loadURL(config.loadingUrl)
		loading_view.webContents.on('dom-ready', () => window.show())
	}

	events() {
		ipcMain.on('stop-loading', () => {
			this.removeLoading()

			setTimeout(() => {
				const res = verify()

				emitter_verify.emit('res', res)
			}, 3000)
		})
	}

	macOSHandler() {
		app.dock!.setIcon(config.dockIconPath)

		app.on('activate', () => {
			this.window?.show()
		})
	}

	removeLoading() {
		const window = this.window!
		const loading_view = this.loading_view!

		window.contentView.removeChildView(loading_view)
	}

	off() {
		this.window = null
	}
}

if (process.platform === 'darwin') {
	Menu()
}

new App().init()
