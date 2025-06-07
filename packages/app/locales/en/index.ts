import app from './app'
import global from './global'
import setting from './setting'

export default {
	translation: {
		...global,
		app,
		setting
	}
} as const
