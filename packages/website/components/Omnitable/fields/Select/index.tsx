import { Select } from 'antd'
import { useMemo } from 'react'

import { $ } from '@website/utils'

import styles from './index.module.css'

import type { Omnitable, ComponentType } from '../../types'

const Index = (props: ComponentType<Omnitable.Select['props']>) => {
	const { self_props, width, value, editing, onFocus, onBlur, onChange } = props
	const { options } = self_props

	const target_options = useMemo(() => {
		if (typeof options[0] === 'object') return options as Array<Omnitable.SelectOption>

		return (options as Array<string>).map(item => ({ label: item, value: item }))
	}, [options])

	const target_option = useMemo(() => {
		if (typeof options[0] === 'string') return value

		return (options as Array<Omnitable.SelectOption>).find(item => item.value === value)?.label
	}, [value, options])

	return (
		<div className={$.cx(styles._local)} style={{ width }}>
			{editing ? (
				<Select
					popupClassName={styles.popup}
					size='small'
					popupMatchSelectWidth={false}
					virtual={false}
					suffixIcon={null}
					options={target_options}
					value={value}
					getPopupContainer={() => document.body}
					onDropdownVisibleChange={onFocus}
					onFocus={onFocus}
					onBlur={onBlur}
					onChange={onChange}
				></Select>
			) : (
				<span className='text_wrap border_box inline_flex align_center'>{target_option}</span>
			)}
		</div>
	)
}

export default $.memo(Index)
