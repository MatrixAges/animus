import { router } from '@desktop/utils'

import add from './add'
import move from './move'
import query from './query'
import remove from './remove'
import update from './update'

export default router({
	add,
	remove,
	move,
	query,
	update
})
