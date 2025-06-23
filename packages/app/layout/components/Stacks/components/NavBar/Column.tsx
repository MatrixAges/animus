import { ScrollMenu } from 'react-horizontal-scrolling-menu'

import { Show } from '@/components'
import { WinActions } from '@/layout/components'
import { is_mac_electron, is_win_electron, onWheel } from '@/utils'
import { useDroppable } from '@dnd-kit/core'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { SidebarIcon } from '@phosphor-icons/react'

import View from './View'

import styles from './index.module.css'

import type { IPropsStacksNavBarColumn } from '@/layout'

const Index = (props: IPropsStacksNavBarColumn) => {
	const {
		sidebar_fold,
		column,
		column_index,
		column_is_last,
		focus,
		resizing,
		click,
		remove,
		update,
		showSidebar
	} = props

	const { active, isOver, setNodeRef } = useDroppable({
		id: `nav_column_${column_index}`,
		data: { type: 'stack', column: column_index }
	})

	return (
		<div
			className={$cx(
				'border_box flex relative is_drag',
				styles.Column,
				resizing && styles.resizing,
				active?.data?.current?.column !== column_index && isOver && styles.isOver,
				sidebar_fold && column_index === 0 && is_mac_electron && styles.mac_with_sidebar_btn
			)}
			style={{ width: `${column.width}%` }}
			ref={setNodeRef}
		>
			<Show
				className='btn_sidebar_wrap h_100 flex justify_center align_center overflow_hidden'
				initial={{ width: 0 }}
				animate={{ width: 36 }}
				exit={{ width: 0 }}
				visible={sidebar_fold}
			>
				<div
					className='btn_sidebar border_box flex justify_center align_center clickit no_drag'
					onClick={showSidebar}
				>
					<SidebarIcon></SidebarIcon>
				</div>
			</Show>
			<SortableContext items={column.views} strategy={horizontalListSortingStrategy}>
				<ScrollMenu
					wrapperClassName={$cx(
						'scroll_wrap',
						sidebar_fold && is_mac_electron && 'is_mac_electron',
						is_win_electron && column_is_last && 'column_is_last'
					)}
					onWheel={onWheel}
				>
					{column.views.map((view, view_index) => (
						<View
							{...{
								column_index,
								view_index,
								view,
								focus,
								click,
								remove,
								update,
								showSidebar
							}}
							key={view.id}
						></View>
					))}
				</ScrollMenu>
			</SortableContext>
			<If condition={is_win_electron && column_is_last!}>
				<WinActions></WinActions>
			</If>
		</div>
	)
}

export default $app.memo(Index)
