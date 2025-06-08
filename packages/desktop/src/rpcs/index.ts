import { router } from '@electron/utils'

import app from './app'
import iap from './iap'

export const routers = router({
	app,
	iap
})

export type Router = typeof routers
