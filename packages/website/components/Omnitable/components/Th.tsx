import { useMemoizedFn } from 'ahooks'

import { CaretDown, CaretUp } from '@phosphor-icons/react'
import { $ } from '@website/utils'

import type { IPropsTh } from '../types'

const Index = (props: IPropsTh) => {
	const { column, order, onSort } = props
	const { name, bind, sort } = column

	const onClick = useMemoizedFn(() => onSort?.(bind))
	const text = column.type === 'operation' ? '' : name

	return (
		<th className={$.cx('form_table_th', sort && 'sort cursor_point')} onClick={sort ? onClick : undefined}>
			{sort ? (
				<div className='inline_flex align_center'>
					<span>{name}</span>
					<div className={$.cx('table_sort flex_column justify_center', order && 'order')}>
						{(order === 'asc' || !order) && <CaretUp className='asc' weight='bold'></CaretUp>}
						{(order === 'desc' || !order) && (
							<CaretDown className='desc' weight='bold'></CaretDown>
						)}
					</div>
				</div>
			) : (
				text
			)}
		</th>
	)
}

export default $.memo(Index)
