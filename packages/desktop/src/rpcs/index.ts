import { router } from '@desktop/utils'

import app from './app'
import chat from './chat'
import file from './file'
import store from './store'

export const routers = router({
	app,
	file,
	store,
	chat
})

export type Router = typeof routers
