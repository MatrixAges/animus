import { router } from '@desktop/utils'

import actions from './actions'
import checkUpdate from './checkUpdate'
import download from './download'
import exit from './exit'
import install from './install'
import list from './list'
import onApp from './onApp'
import onUpdate from './onUpdate'
import recent from './recent'
import relaunch from './relaunch'
import setGlass from './setGlass'
import setTheme from './setTheme'
import write from './write'

export default router({
	list,
	recent,
	onApp,
	onUpdate,
	exit,
	relaunch,
	actions,
	checkUpdate,
	download,
	install,
	setTheme,
	setGlass,
	write
})
