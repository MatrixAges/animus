import '@desktop/utils/locale'

import { app, BrowserWindow, ipcMain, WebContentsView } from 'electron'
import { createIPCHandler } from 'electron-trpc/main'

import config from '../config'
import { Main, Menu, Tray } from './app'
import { routers } from './rpcs'
import { conf, is_mac, show_devtool } from './utils'

import type { Tray as TrayType } from 'electron'

conf.registerRendererListener()

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

			this.loading()
			this.events()

			if (show_devtool) {
				if (process.platform === 'win32') {
					const win_devtools = new BrowserWindow()

					this.window.webContents.setDevToolsWebContents(win_devtools.webContents)
				}

				this.window.webContents.openDevTools({ mode: 'detach' })
			}

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

	loading() {
		const window = this.window!
		const loading_view = this.loading_view!
		const { width, height } = window.getBounds()

		window.setResizable(false)
		window.contentView.addChildView(loading_view)

		loading_view.setBounds({ x: 0, y: 0, width, height })
		loading_view.webContents.loadURL(config.loading_url)
		loading_view.webContents.on('dom-ready', () => window.show())
	}

	events() {
		ipcMain.on('stop-loading', () => {
			this.removeLoading()
			this.window!.setResizable(true)
		})
	}

	macOSHandler() {
		app.dock!.setIcon(config.dock_icon_path)

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
