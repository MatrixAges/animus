import { useMemoizedFn } from 'ahooks'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

import { $ } from '@website/utils'

import styles from './index.module.css'

import type { Omnitable, ComponentType } from '../../types'
import type { Dayjs } from 'dayjs'

const Index = (props: ComponentType<Omnitable.DatePicker['props']>) => {
	const { self_props, width, value, editing, use_by_form, onFocus, onBlur, onChange } = props
	const { format = 'MMMM D, YYYY' } = self_props || {}

	const onChangeDate = useMemoizedFn((v: Dayjs) => onChange?.(v.format(format)))

	return (
		<div
			className={$.cx('w_100 flex align_center', styles._local, use_by_form && styles.use_by_form)}
			style={{ width }}
		>
			{editing ? (
				<DatePicker
					{...self_props}
					popupClassName={styles.popup}
					className='w_100'
					placement='bottomLeft'
					suffixIcon={null}
					allowClear={false}
					format={format}
					getPopupContainer={() => document.body}
					value={dayjs(value)}
					onFocus={onFocus}
					onBlur={onBlur}
					onChange={onChangeDate}
				></DatePicker>
			) : (
				<span className='text_wrap w_100 line_clamp_1 border_box inline_flex align_center'>
					{dayjs(value).format(format)}
				</span>
			)}
		</div>
	)
}

export default $.memo(Index)
