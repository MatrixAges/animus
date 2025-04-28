import { App, Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { useLayoutEffect, useMemo, useState } from 'react'

import { $ } from '@website/utils'

import { useContext } from '../../context'
import styles from './index.module.css'
import Model from './model'

import type { Omnitable, ComponentType } from '../../types'

const { useApp } = App

const Index = (props: ComponentType<Omnitable.Select['props']>) => {
	const { self_props, width, value, editing, use_by_form, use_by_filter, onFocus, onBlur, onChange } = props
	const { options: options_raw, remote, mode, borderless, ...rest_props } = self_props

	const [x] = useState(() => new Model())
	const [options, setOptions] = useState<Array<Omnitable.SelectOption>>(() => options_raw || [])
	const antd = useApp()
	const base_url = useContext(v => v.base_url)

	const multiple = mode !== undefined

	useLayoutEffect(() => {
		x.init({ antd, base_url, remote, multiple, setOptions })
	}, [antd, base_url, remote, multiple, setOptions])

	const options_real = useMemo(() => {
		return options.map(item => {
			if (item.icon) {
				item.label = (
					<div className='h_100 flex align_center'>
						<div
							className='icon_wrap flex justify_center align_center'
							style={{ width: 16, height: 16 }}
						>
							<img src={`/icons/${item.icon}.svg`} alt='icon' />
						</div>
						<span className='text ml_4'>{item.label}</span>
					</div>
				)

				delete item['icon']
			}

			return item
		})
	}, [options])

	const option = useMemo(() => {
		if (multiple) {
			if (!value || !Array.isArray(value) || !value.length) return

			const targets = options_real.filter(item => value.includes(item.value))

			return targets.join(',')
		}

		if (!options_real.length) return value

		return options_real.find(item => item.value === value)?.label
	}, [options_real, value])

	const search_props = $.copy(x.search_props)

	return (
		<div className={$.cx(styles._local, borderless && styles.borderless)} style={{ width }}>
			{editing ? (
				<Select
					{...rest_props}
					{...search_props}
					className={$.cx((mode || Boolean(width) || remote?.search) && 'w_100')}
					popupClassName={$.cx(styles.popup)}
					size={use_by_form ? 'middle' : 'small'}
					popupMatchSelectWidth={false}
					virtual={false}
					suffixIcon={null}
					mode={use_by_filter ? 'multiple' : mode}
					options={options}
					value={value}
					getPopupContainer={() => document.body}
					onDropdownVisibleChange={onFocus}
					onFocus={onFocus}
					onBlur={onBlur}
					onChange={onChange}
				></Select>
			) : (
				<span
					className={$.cx(
						'text_wrap w_100 border_box inline_flex align_center',
						!option && 'placeholder'
					)}
				>
					{option || self_props.placeholder}
				</span>
			)}
		</div>
	)
}

export default $.memo(observer(Index))
