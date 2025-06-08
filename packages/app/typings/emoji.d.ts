import 'react'

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'em-emoji': {
				className?: string
				shortcodes?: string
				size?: string
				style?: any
			}
		}
	}
}
