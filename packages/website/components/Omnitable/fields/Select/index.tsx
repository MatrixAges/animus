import { Select } from 'antd'
import { useMemo } from 'react'

import { $ } from '@website/utils'

import styles from './index.module.css'

import type { Omnitable, ComponentType } from '../../types'

const Index = (props: ComponentType<Omnitable.Select['props']>) => {
	const { self_props, width, value, editing, use_by_form, use_by_filter, onFocus, onBlur, onChange } = props
	const { options, ...rest_props } = self_props

	const target_options = useMemo(() => {
		if (typeof options[0] === 'object') {
			return (options as Array<Omnitable.SelectOption>).map(item => {
				if (item.icon) {
					item.label = (
						<div className='h_100 flex align_center'>
							<em-emoji
								id={item.icon}
								style={{ width: '1.11em', height: '1.11em' }}
							></em-emoji>
							<span className='text ml_4'>{item.label}</span>
						</div>
					)

					delete item['icon']
				}

				return item
			})
		}

		return (options as Array<string>).map(item => ({ label: item, value: item }))
	}, [options])

	const target_option = useMemo(() => {
		if (typeof options[0] === 'string') return value

		return (options as Array<Omnitable.SelectOption>).find(item => item.value === value)?.label
	}, [value, options])

	return (
		<div className={$.cx(styles._local, styles.icon)} style={{ width }}>
			{editing ? (
				<Select
					{...rest_props}
					popupClassName={$.cx(styles.popup, styles.icon)}
					size={use_by_form ? 'middle' : 'small'}
					popupMatchSelectWidth={false}
					virtual={false}
					suffixIcon={null}
					mode={use_by_filter ? 'multiple' : undefined}
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
