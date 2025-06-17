declare module '*.css'
declare module '*.png'
declare module '*.jpg'
declare module '*.svg'
declare module '*.jpeg'
declare module '*.mp3'

declare module '*.svg?react' {
	import { FC, SVGProps } from 'react'

	const content: FC<SVGProps<SVGSVGElement>>

	export default content
}

declare function If(props: {
	condition: boolean | string | number | React.ReactNode | undefined
	children: React.ReactNode
}): any

declare function Choose(props: { children: React.ReactNode }): any
declare function When(props: { condition: boolean; children: React.ReactNode }): any
declare function Otherwise(props: { children: React.ReactNode }): any
