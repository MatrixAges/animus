import { useMemoizedFn } from 'ahooks'
import { useLayoutEffect, useRef, Fragment } from 'react'

import { $ } from '@website/utils'
import StickyTableHeader from '@website/utils/StickyTableHeader'

import Row from './Row'
import Th from './Th'

import type { IPropsTable } from '../types'

const Index = (props: IPropsTable) => {
	const { primary, table_columns, data, editing_info, sort_params, modal_index, setEditingInfo, onChange, onSort } =
		props
	const table = useRef<HTMLTableElement>(null)
	const clone_table = useRef<HTMLTableElement>(null)
	const sticky = useRef<StickyTableHeader>(null)

	useLayoutEffect(() => {
		if (table.current && clone_table.current) {
			sticky.current = new StickyTableHeader(table.current, clone_table.current, { max: 0 })

			return () => sticky.current?.destroy()
		}
	}, [sort_params])

	const getOrder = useMemoizedFn((item: IPropsTable['table_columns'][number]) => {
		if (!item.sort || !sort_params.length) return

		return sort_params.find(s => s.field === item.bind)?.order
	})

	return (
		<Fragment>
			<div className='table_container w_100'>
				<table className='table_wrap w_100' ref={table}>
					<thead>
						<tr className={$.cx(modal_index === 0 && 'selected')}>
							{table_columns.map(item => (
								<Th
									column={item}
									order={getOrder(item)}
									onSort={item.sort ? onSort : undefined}
									key={item.name}
								></Th>
							))}
						</tr>
					</thead>
					<tbody>
						{data.map((item, index) => (
							<Row
								table_columns={table_columns}
								modal_index={modal_index}
								item={item}
								index={index}
								editing_info={
									editing_info?.row_index === index && editing_info
										? editing_info
										: null
								}
								setEditingInfo={setEditingInfo}
								onChange={onChange}
								key={item[primary]}
							></Row>
						))}
					</tbody>
				</table>
			</div>
			<div className='table_container clone w_100' style={{ zIndex: 103 }}>
				<table className='table_wrap w_100' ref={clone_table} />
			</div>
		</Fragment>
	)
}

export default $.memo(Index)
