import { Select } from 'antd'
import { useMemo } from 'react'

import { CheckCircle, Question, Timer, XCircle } from '@phosphor-icons/react'
import { $ } from '@website/utils'

import styles from './index.module.css'

import type { Omnitable, ComponentType } from '../../types'

const options = [
	{
		label: (
			<span className='flex align_center'>
				<Question className='mr_4' size={16}></Question>
				Todo
			</span>
		),
		value: 3
	},
	{
		label: (
			<span className='flex align_center'>
				<Timer className='mr_4' size={16}></Timer>
				In-progress
			</span>
		),
		value: 2
	},
	{
		label: (
			<span className='flex align_center'>
				<CheckCircle className='mr_4' size={16}></CheckCircle>
				Done
			</span>
		),
		value: 1
	},
	{
		label: (
			<span className='flex align_center'>
				<XCircle className='mr_4' size={16}></XCircle>
				Canceled
			</span>
		),
		value: 0
	}
]

const Index = (props: ComponentType<Omnitable.Status['props']>) => {
	const { self_props, width, value, editing, use_by_form, use_by_filter, onFocus, onBlur, onChange } = props

	const target_option = useMemo(() => {
		return options.find(item => item.value === value)?.label
	}, [value, options])

	return (
		<div className={$.cx(styles._local)} style={{ width }}>
			{editing ? (
				<Select
					{...self_props}
					popupClassName={styles.popup}
					size={use_by_form ? 'middle' : 'small'}
					popupMatchSelectWidth={false}
					virtual={false}
					suffixIcon={null}
					mode={use_by_filter ? 'multiple' : undefined}
					options={options}
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
