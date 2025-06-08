import { router } from '@desktop/utils'

import app from './app'
import iap from './iap'

export const routers = router({
	app,
	iap
})

export type Router = typeof routers
