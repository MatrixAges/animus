import Column from './Column'

import type { IPropsStacksNavBar } from '../../../../types'

const Index = (props: IPropsStacksNavBar) => {
	const { sidebar_fold, columns, focus, resizing, click, remove, update, showSidebar } = props

	return (
		<div className='w_100 flex relative'>
			{columns.map((column, column_index) => (
				<Column
					{...{
						sidebar_fold,
						column,
						column_index,
						focus,
						resizing,
						click,
						remove,
						update,
						showSidebar
					}}
					column_is_last={column_index === columns.length - 1}
					key={column_index}
				></Column>
			))}
		</div>
	)
}

export default $app.memo(Index)
