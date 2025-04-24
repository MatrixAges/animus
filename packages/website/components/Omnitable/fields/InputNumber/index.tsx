import { InputNumber } from 'antd'

import { $ } from '@website/utils'

import styles from './index.module.css'

import type { Omnitable, ComponentType } from '../../types'

const Index = (props: ComponentType<Omnitable.InputNumber['props']>) => {
	const { self_props, width, value, editing, use_by_form, disabled, onFocus, onBlur, onChange } = props
	const {} = self_props || {}

	return (
		<div
			className={$.cx(styles._local, use_by_form && styles.use_by_form, disabled && styles.disabled)}
			style={{ width }}
		>
			{editing ? (
				<InputNumber
					{...self_props}
					className='w_100'
					variant='borderless'
					value={value}
					onFocus={onFocus}
					onBlur={onBlur}
					onChange={onChange}
				></InputNumber>
			) : (
				<span className='text_wrap border_box inline_flex align_center'>{value}</span>
			)}
		</div>
	)
}

export default $.memo(Index)
