import app from './app'
import chatbox from './chatbox'
import global from './global'
import layout from './layout'
import setting from './setting'

export default {
	translation: {
		...global,
		app,
		setting,
		layout,
		chatbox
	}
} as const
