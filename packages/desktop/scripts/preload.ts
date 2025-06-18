import { contextBridge, ipcRenderer } from 'electron'
import { exposeConf } from 'electron-conf/preload'
import { exposeElectronTRPC } from 'erpc/main'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

exposeConf()

contextBridge.exposeInMainWorld('$shell', {
	type: 'electron',
	platform: process.platform,
	stopLoading: function () {
		ipcRenderer.send('stop-loading')
	}
})

process.once('loaded', () => {
	exposeElectronTRPC()
})
