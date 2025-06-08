import { autoUpdater } from 'electron-updater'

import { p } from '@electron/utils'

export default p.query(async () => {
	autoUpdater.checkForUpdates()
})
