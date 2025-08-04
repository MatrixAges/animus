export interface ArgsInit {
	id: string
	read: (args: { filename: string; module?: string; ext?: string }) => any
	write: (args: {
		filename: string
		data: any
		module?: string
		ext?: string
		merge?: boolean
		default_value?: any
	}) => void
}
