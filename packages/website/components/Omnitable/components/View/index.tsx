import { useMemoizedFn } from 'ahooks'
import { Empty } from 'antd'

import { $ } from '@website/utils'

import styles from './index.module.css'
import Item from './Item'

import type { IPropsView, IPropsViewItem } from '../../types'

const Index = (props: IPropsView) => {
	const { filter_columns, views, getSortFieldOptions, onApplyView, onChangeViews } = props

	const onChangeView: IPropsViewItem['onChangeView'] = useMemoizedFn((index, v) => {
		const target = $.copy(views)

		target[index] = v

		onChangeViews(target)
	})

	const remove: IPropsViewItem['remove'] = useMemoizedFn(index => {
		const target = $.copy(views)

		target.splice(index, 1)

		onChangeViews(target)
	})

	if (!views.length) {
		return (
			<div className={$.cx('w_100 h_100 flex justify_center align_center', styles.empty)}>
				<Empty description={null}></Empty>
			</div>
		)
	}

	return (
		<div className={$.cx('w_100 flex flex_column', styles._local)}>
			{views.map((view, view_index) => (
				<Item
					{...{
						filter_columns,
						view,
						view_index,
						getSortFieldOptions,
						onApplyView,
						onChangeView,
						remove
					}}
					key={view_index}
				></Item>
			))}
		</div>
	)
}

export default $.memo(Index)
