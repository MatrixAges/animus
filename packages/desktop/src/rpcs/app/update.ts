import { EventEmitter, on } from 'events'
import { autoUpdater } from 'electron-updater'

import { p, r2_url } from '@desktop/utils'

import type { ProgressInfo, UpdateInfo } from 'electron-updater'

const event = new EventEmitter()
const { emit } = event

type Res =
	| { type: 'can_update'; value: string }
	| { type: 'cant_update' }
	| { type: 'progress'; value: number }
	| { type: 'downloaded' }
	| { type: 'error'; value: Error }

export default p.subscription(async function* (args) {
	const { signal } = args

	autoUpdater.setFeedURL({ provider: 'generic', url: `${r2_url}/release/${process.platform}/${process.arch}` })

	autoUpdater.autoDownload = false
	autoUpdater.autoInstallOnAppQuit = true
	autoUpdater.autoRunAppAfterInstall = true

	const onCanUpdate = (args: UpdateInfo) => emit('UPDATE', { type: 'can_update', value: args.version })
	const onCantUpdate = () => emit('UPDATE', { type: 'downloaded' })
	const onProgress = (args: ProgressInfo) => emit('UPDATE', { type: 'progress', value: Math.floor(args.percent) })
	const onDownloaded = () => emit('UPDATE', { type: 'downloaded' })
	const onError = (args: Error) => emit('UPDATE', { type: 'error', value: args })

	autoUpdater.on('update-available', onCanUpdate)
	autoUpdater.on('update-not-available', onCantUpdate)
	autoUpdater.on('download-progress', onProgress)
	autoUpdater.on('update-downloaded', onDownloaded)
	autoUpdater.on('error', onError)

	try {
		for await (const [data] of on(event, 'UPDATE', { signal })) {
			yield data as Res
		}
	} finally {
		autoUpdater.off('update-available', onCanUpdate)
		autoUpdater.off('update-not-available', onCantUpdate)
		autoUpdater.off('download-progress', onProgress)
		autoUpdater.off('update-downloaded', onDownloaded)
		autoUpdater.off('error', onError)
	}
})
