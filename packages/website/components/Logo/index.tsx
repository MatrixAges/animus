'use client'

import { useTheme } from '@website/hooks'
import { $ } from '@website/utils'

interface IProps {
	className?: HTMLDivElement['className']
	size?: number
	color?: string
}

const Index = (props: IProps) => {
	const { theme } = useTheme()
	const { className, size = 48, color = theme === 'dark' ? 'var(--color_text)' : 'var(--color_main)' } = props

	return (
		<div className={$.cx('flex', className)} style={{ width: size, height: size, fill: color }}>
			<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 512 512'>
				<path
					d='M193.287,165.279c27.713-48,96.994-48,124.707,0l70.151,121.5c27.713,48-6.928,108-62.354,108H185.49c-55.426,0-90.067-60-62.353-108Z'
					fillRule='evenodd'
				/>
			</svg>
		</div>
	)
}

export default $.memo(Index)
