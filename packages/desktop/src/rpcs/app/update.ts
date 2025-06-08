import { autoUpdater } from 'electron-updater'

import { p, r2_url } from '@electron/utils'
import { observable } from '@trpc/server/observable'

import type { ProgressInfo, UpdateInfo } from 'electron-updater'

type Res =
	| { type: 'can_update'; value: string }
	| { type: 'cant_update' }
	| { type: 'progress'; value: number }
	| { type: 'downloaded' }
	| { type: 'error'; value: Error }

export default p.subscription(() => {
	autoUpdater.setFeedURL({
		provider: 'generic',
		url: `${r2_url}/release/${process.platform}/${process.arch}`
	})

	autoUpdater.autoDownload = false
	autoUpdater.autoInstallOnAppQuit = true
	autoUpdater.autoRunAppAfterInstall = true

	return observable<Res>(emit => {
		const onCanUpdate = (args: UpdateInfo) => emit.next({ type: 'can_update', value: args.version })
		const onCantUpdate = () => emit.next({ type: 'cant_update' })
		const onProgress = (args: ProgressInfo) => emit.next({ type: 'progress', value: Math.floor(args.percent) })
		const onDownloaded = () => emit.next({ type: 'downloaded' })
		const onError = (args: Error) => emit.next({ type: 'error', value: args })

		autoUpdater.on('update-available', onCanUpdate)
		autoUpdater.on('update-not-available', onCantUpdate)
		autoUpdater.on('download-progress', onProgress)
		autoUpdater.on('update-downloaded', onDownloaded)
		autoUpdater.on('error', onError)

		return () => {
			autoUpdater.off('update-available', onCanUpdate)
			autoUpdater.off('update-not-available', onCantUpdate)
			autoUpdater.off('download-progress', onProgress)
			autoUpdater.off('update-downloaded', onDownloaded)
			autoUpdater.off('error', onError)
		}
	})
})
