import dayjs from 'dayjs'
import { useMemo } from 'react'

import { $ } from '@website/utils'

import styles from './index.module.css'

import type { TooltipProps } from 'recharts'
const Index = (props: TooltipProps<any, any>) => {
	const { payload } = props

	if (!payload?.length) return null

	const { payload: item } = payload[0]
	const { range } = item
	const [start, end] = range

	const status_items = useMemo(() => {
		const items = [] as Array<{ label: string; code: string; count: number }>

		if ('5xx' in item) items.push({ label: 'Error', code: '5xx', count: item['5xx'] })
		if ('4xx' in item) items.push({ label: 'Warning', code: '4xx', count: item['4xx'] })
		if ('2xx' in item) items.push({ label: 'Success', code: '2xx', count: item['2xx'] })

		return items
	}, [item])

	return (
		<div className={$.cx('flex flex_column', styles.tooltip)}>
			<span className='title'>
				{dayjs(start).format('MM-DD HH:mm')}-{dayjs(end).format('HH:mm')}
			</span>
			<div className='status_items w_100 flex flex_column'>
				{status_items.map(item => (
					<div className='status_item w_100 flex justify_between align_center' key={item.code}>
						<div className='flex align_center'>
							<span className={$.cx('dot', item.label)}></span>
							<span className='label'>{item.label}</span>
							<span className='code'>{item.code}</span>
						</div>
						<span className='count'>{item.count}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default Index
