import { useMemoizedFn } from 'ahooks'

import { $ } from '@website/utils'

import type { IPropsTh } from '../types'

const Index = (props: IPropsTh) => {
	const { column, sorting_params, onSort } = props
	const { name, bind, sort } = column

	const onClick = useMemoizedFn(() => (sort ? () => onSort?.(bind) : undefined))
	const text = column.type === 'operation' ? '' : name

	return (
		<th className={$.cx('form_table_th', sort && 'sorting')} onClick={onClick}>
			{sorting_params ? (
				<div className='align_center' style={{ display: 'inline-flex' }}>
					<span>{name}</span>
					<div className='table_sort flex_column ml_6'>
						<span
							className={$.cx('asc sort_item', sorting_params?.order === 'asc' && 'active')}
						></span>
						<span
							className={$.cx(
								'desc sort_item',
								sorting_params?.order === 'desc' && 'active'
							)}
						></span>
					</div>
				</div>
			) : (
				text
			)}
		</th>
	)
}

export default $.memo(Index)
