import { useMemo } from 'react'

import { $ } from '@website/utils'

import { Icon } from '../../components'
import { preset_color } from '../../metadata'
import styles from './index.module.css'

import type { Omnitable, ComponentType } from '../../types'

const Index = (props: ComponentType<Omnitable.Tag['props']>) => {
	const { self_props, width, value, use_by_form } = props
	const {
		options,
		mode = 'full',
		dot_shape = 'circle',
		dot_size = 9,
		icon_size = '1em',
		icon_position = 'left',
		use_bg
	} = self_props

	const option = useMemo(() => options.find(item => item.value === value), [value, options])

	if (!option) return '-'

	return (
		<div
			className={$.cx(
				'border_box inline_flex align_center',
				styles._local,
				mode === 'dot' && styles.dot_mode,
				use_by_form && styles.use_by_form
			)}
			style={{
				width,
				'--tag_color': preset_color[option.color as keyof typeof preset_color] ?? option.color
			}}
		>
			<div
				className={$.cx(
					'option_wrap inline_flex align_center',
					mode,
					use_bg && 'use_bg',
					icon_position === 'right' && 'position_right'
				)}
			>
				{option.icon ? (
					<span
						className='icon_wrap flex justify_center align_center'
						style={{ width: icon_size, height: icon_size, fontSize: icon_size }}
					>
						<Icon id={option.icon}></Icon>
					</span>
				) : (
					<span
						className={$.cx('dot', dot_shape)}
						style={{ width: dot_size, height: dot_size }}
					></span>
				)}
				<span className='text'>{option.label || option.value}</span>
			</div>
		</div>
	)
}

export default $.memo(Index)
