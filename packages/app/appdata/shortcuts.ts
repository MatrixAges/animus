import type { Shortcuts } from '@/models'

export default [
	{
		key_bindings: { darwin: 'command+k', win32: 'ctrl+k' },
		event_path: 'app.openSearch',
		readonly: true,
		options: { keydown: true, keyup: false }
	},
	{
		key_bindings: '*',
		special_key: 'escape',
		event_path: 'app.closeSearch',
		readonly: true,
		options: { keydown: false, keyup: true }
	}
] as Shortcuts['keys']
