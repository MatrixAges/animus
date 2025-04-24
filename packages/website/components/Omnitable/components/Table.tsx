import { $ } from '@website/utils'

import Row from './Row'
import Th from './Th'

import type { IPropsTable } from '../types'

const Index = (props: IPropsTable) => {
	const { primary, table_columns, data, editing_info, sort_params, modal_index, setEditingInfo, onChange, onSort } =
		props

	return (
		<table className='table_wrap w_100'>
			<thead>
				<tr className={$.cx(modal_index === 0 && 'selected')}>
					{table_columns.map(item => (
						<Th
							column={item}
							sorting_params={
								item.sort && sort_params?.field === item.bind && sort_params.order
									? sort_params
									: undefined
							}
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
							editing_info?.row_index === index && editing_info ? editing_info : null
						}
						setEditingInfo={setEditingInfo}
						onChange={onChange}
						key={item[primary]}
					></Row>
				))}
			</tbody>
		</table>
	)
}

export default $.memo(Index)
