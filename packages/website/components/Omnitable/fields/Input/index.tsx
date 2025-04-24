import { Input } from 'antd'

import { $ } from '@website/utils'

import styles from './index.module.css'

import type { Omnitable, ComponentType } from '../../types'

const Index = (props: ComponentType<Omnitable.Input['props']>) => {
	const { self_props, width, value, editing, use_by_form, disabled, onFocus, onBlur, onChange } = props
	const {} = self_props || {}

	return (
		<div
			className={$.cx(
				'w_100 flex align_center',
				styles._local,
				use_by_form && styles.use_by_form,
				disabled && styles.disabled
			)}
			style={{ width }}
		>
			{editing ? (
				<Input
					{...self_props}
					className='w_100 line_clamp_1'
					variant={use_by_form ? 'outlined' : 'borderless'}
					value={value}
					onFocus={onFocus}
					onBlur={onBlur}
					onChange={onChange}
				></Input>
			) : (
				<span className='text_wrap line_clamp_1 border_box'>{value}</span>
			)}
		</div>
	)
}

export default $.memo(Index)
