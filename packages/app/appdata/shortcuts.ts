import type { Shortcuts } from '@/models'

export default [
	{
		key_bindings: { darwin: 'command+,', win32: 'ctrl+,' },
		event_path: 'app.toggleSetting',
		readonly: true
	},
	{
		key_bindings: { darwin: 'command+k', win32: 'ctrl+k' },
		event_path: 'app.openSearch',
		readonly: true
	},
	{
		key_bindings: '*',
		special_key: 'escape',
		event_path: 'app.closeSearch',
		readonly: true,
		options: { keyup: true }
	}
] as Shortcuts['keys']
