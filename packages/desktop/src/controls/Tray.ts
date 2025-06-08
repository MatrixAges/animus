import { app, screen, BrowserWindow, Menu, Tray } from 'electron'
import positioner from 'electron-traywindow-positioner'
import { t } from 'i18next'

import { conf, getLoadURL, getPath, is_win } from '@electron/utils'

import config, { common_window_web_preferences } from '../../config'

import type { Tray as ITray } from 'electron'
import type { App } from '@electron/types'

export default class Index {
	private window: BrowserWindow | null
	private tray = null as unknown as ITray
	private tray_window = null as unknown as BrowserWindow

	constructor(window: BrowserWindow) {
		this.window = window || null

		this.init()
	}

	getMenu() {
		const win = this.window!

		const visible = win.isVisible()

		return Menu.buildFromTemplate([
			{
				label: visible ? t('global.close') : t('global.show'),
				click: () => (visible ? win.close() : win.show())
			},
			{
				label: t('global.quit'),
				click: () => app.quit()
			}
		])
	}

	init() {
		const win = this.window!

		this.tray = new Tray(config.getTrayIcon())

		this.tray.setToolTip(app.name)

		this.tray.on('click', async () => {
			if (this.tray_window) {
				this.positionTrayWindow()

				this.tray_window.isVisible() ? this.tray_window.hide() : this.tray_window.show()
			} else {
				win.isVisible() ? win.close() : win.show()
			}
		})

		this.tray.on('right-click', () => {
			this.tray!.popUpContextMenu(this.getMenu())
		})

		this.createTrayWindow()
		this.onTrayWindow()
	}

	onTrayWindow() {
		conf.onDidChange('tray_window', v => {
			if (v) {
				if (this.tray_window) return

				this.createTrayWindow()
			} else {
				if (!this.tray_window) return

				this.tray_window.destroy()
				this.tray_window = null as unknown as BrowserWindow
			}
		})

		conf.onDidChange('tray_bounds', _v => {
			const v = _v as App.Widget

			if (!this.tray_window) return
			if (!v) return

			this.setTrayWindowAttrs()

			if (v.show) {
				const bounds = this.tray_window.getBounds()

				if (v.bounds) {
					this.tray_window.setBounds({ ...bounds, ...v.bounds })
				} else {
					const { width } = screen.getPrimaryDisplay().workAreaSize

					this.tray_window.setBounds({ ...bounds, x: width - bounds.width - 12, y: 0 })
				}
			} else {
				this.positionTrayWindow()
			}
		})
	}

	onTrayWindowChange() {
		if (!this.tray_window) return

		this.tray_window.on('moved', async () => {
			const tray_bounds = (await conf.get('tray_bounds')) as App.Widget

			if (!tray_bounds?.show) return

			const bounds = this.tray_window.getBounds()

			conf.set('tray_bounds', { ...tray_bounds, bounds })
		})
	}

	async setTrayWindowAttrs() {
		const tray_bounds = (await conf.get('tray_bounds')) as App.Widget

		if (tray_bounds?.show) {
			this.tray_window.setHasShadow(false)
			this.tray_window.setAlwaysOnTop(false)
		} else {
			this.tray_window.setHasShadow(true)
			this.tray_window.setAlwaysOnTop(true)
		}
	}

	async positionTrayWindow() {
		const tray_bounds = (await conf.get('tray_bounds')) as App.Widget

		if (tray_bounds && tray_bounds.show) {
			const bounds = this.tray_window.getBounds()

			this.tray_window.setBounds({ ...bounds, ...tray_bounds.bounds })
			this.tray_window.show()
		} else {
			positioner.position(this.tray_window, this.tray.getBounds(), {
				x: 'center',
				y: is_win ? 'up' : 'down'
			})
		}
	}

	async createTrayWindow() {
		if (!conf.get('tray_window')) return

		this.tray_window = new BrowserWindow({
			frame: false,
			resizable: false,
			fullscreen: false,
			transparent: true,
			alwaysOnTop: true,
			autoHideMenuBar: true,
			show: false,
			backgroundMaterial: 'tabbed',
			titleBarStyle: 'hidden',
			vibrancy: 'under-window',
			visualEffectState: 'active',
			width: 330,
			height: 600,
			trafficLightPosition: { x: -100, y: -100 },
			webPreferences: {
				...common_window_web_preferences
				// devTools: true
			}
		})

		// this.tray_window.webContents.openDevTools({ mode: 'detach' })

		await this.tray_window.loadURL(getLoadURL('/widgets/tray'))

		this.positionTrayWindow()
		this.setTrayWindowAttrs()
		this.onTrayWindowChange()
	}

	get() {
		return this.tray
	}

	getTrayWindow() {
		return this.tray_window
	}
}
