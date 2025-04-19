declare module '*.css'
declare module '*.png'
declare module '*.jpeg'

declare module '*.inline.svg' {
	import { FC, SVGProps } from 'react'

	const content: FC<SVGProps<SVGSVGElement>>
	export default content
}

declare function If(props: { condition: boolean; children: React.ReactNode }): any
declare function Choose(props: { children: React.ReactNode }): any
declare function When(props: { condition: boolean; children: React.ReactNode }): any
declare function Otherwise(props: { children: React.ReactNode }): any

declare module '@microflash/rehype-figure' {
	const fn: () => void

	export default fn
}
