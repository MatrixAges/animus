import { contextBridge, ipcRenderer } from 'electron'
import { exposeConf } from 'electron-conf/preload'
import { exposeElectronTRPC } from 'electron-trpc/main'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

exposeConf()

contextBridge.exposeInMainWorld('$shell', {
	type: 'electron',
	platform: process.platform,
	id_platform: process.env.PLATFORM,
	stopLoading: function () {
		ipcRenderer.send('stop-loading')
	}
})

process.once('loaded', () => {
	exposeElectronTRPC()
})
