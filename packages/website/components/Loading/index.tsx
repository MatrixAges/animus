'use client'

import { Logo } from '@website/components'
import { useTheme } from '@website/hooks'
import { $ } from '@website/utils'

import styles from './index.module.css'

interface IProps {
	size?: number
	desc?: string
	use_by_component?: boolean
	className?: string
}

const Index = (props: IProps) => {
	const { size = 96, desc, use_by_component, className } = props
	const { theme } = useTheme()

	return (
		<div
			className={$.cx(
				'flex flex_column justify_center align_center',
				styles._local,
				styles[theme],
				use_by_component && styles.use_by_component,
				className
			)}
			style={{ '--loading_size': size + 'px' }}
		>
			<div className='loading_wrap relative'>
				<Logo
					className='loading_icon bottom w_100 h_100 absolute top_0 left_0'
					size={size}
					color='inherit'
				></Logo>
				<Logo
					className='loading_icon top w_100 h_100 absolute top_0 left_0'
					size={size}
					color='inherit'
				></Logo>
			</div>
			{desc && <span className='desc border_box text_center'>{desc}</span>}
		</div>
	)
}

export default $.memo(Index)
