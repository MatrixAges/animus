import { router } from '@desktop/utils'

import { destroy, updateOptions } from './events'
import init from './init'

export default router({
	init,
	updateOptions,
	destroy
})
