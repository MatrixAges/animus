import { router } from '@desktop/utils'

import list from './list'
import read from './read'
import recent from './recent'
import watch from './watch'
import write from './write'

export default router({
	list,
	recent,
	read,
	write,
	watch
})
