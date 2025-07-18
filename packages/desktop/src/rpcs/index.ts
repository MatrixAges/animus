import { router } from '@desktop/utils'

import app from './app'
import file from './file'
import store from './store'

export const routers = router({
	app,
	file,
	store
})

export type Router = typeof routers
