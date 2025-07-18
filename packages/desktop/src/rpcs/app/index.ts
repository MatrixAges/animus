import { router } from '@desktop/utils'

import actions from './actions'
import checkUpdate from './checkUpdate'
import download from './download'
import exit from './exit'
import install from './install'
import onApp from './onApp'
import onUpdate from './onUpdate'
import relaunch from './relaunch'
import setGlass from './setGlass'
import setTheme from './setTheme'
import workspace from './workspace'

export default router({
	workspace,
	onApp,
	onUpdate,
	exit,
	relaunch,
	actions,
	checkUpdate,
	download,
	install,
	setTheme,
	setGlass
})
