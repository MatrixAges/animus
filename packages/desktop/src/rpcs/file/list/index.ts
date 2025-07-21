import { router } from '@desktop/utils'

import add from './add'
import move from './move'
import query from './query'
import remove from './remove'

export default router({
	add,
	remove,
	move,
	query
})
