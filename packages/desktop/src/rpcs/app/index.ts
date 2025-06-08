import { router } from '@desktop/utils'

import actions from './actions'
import checkUpdate from './checkUpdate'
import download from './download'
import exit from './exit'
import install from './install'
import on from './on'
import relaunch from './relaunch'
import update from './update'
import updateTray from './updateTray'

export default router({
	on,
	exit,
	relaunch,
	actions,
	update,
	checkUpdate,
	download,
	install,
	updateTray
})
