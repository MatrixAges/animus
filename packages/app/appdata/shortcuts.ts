import type { Shortcuts } from '@/models'

export default [
	{
		key_bindings: { darwin: 'command+k', win32: 'ctrl+k' },
		event_path: 'app.showSearch',
		readonly: true,
		options: { keydown: true, keyup: false }
	},
	{
		key_bindings: '*',
		special_key: 'escape',
		event_path: 'app.hideSearch',
		readonly: true,
		options: { keydown: false, keyup: true }
	}
] as Shortcuts['keys']
