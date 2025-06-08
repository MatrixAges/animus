import { useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'
import { Button } from 'antd'
import { useDoubleClick } from 'stk/react'

import { module_icon } from '@/appdata'
import { Emoji } from '@/components'
import { useScrollToItem } from '@/hooks'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { XIcon } from '@phosphor-icons/react'

import type { IPropsStacksNavBarView } from '@/layout/types'

const Index = (props: IPropsStacksNavBarView) => {
	const { column_index, view_index, view, focus, drag_overlay, click, remove, update } = props

	const { attributes, listeners, transform, transition, isDragging, setNodeRef } = useSortable({
		id: view.id,
		data: { type: 'stack', column: column_index, view: view_index }
	})

	useScrollToItem(view.id, view.active, isDragging)

	const is_focus = useMemo(
		() => column_index === focus.column && view_index === focus.view,
		[column_index, view_index, focus]
	)

	const fixedItem = useDoubleClick(position => update({ position, v: { fixed: true } }))

	const onMouseDown = useMemoizedFn(e => {
		if (e.button !== 0) return

		click({ column: column_index, view: view_index })
		fixedItem({ column: column_index, view: view_index })
	})

	return (
		<div
			className='drag_wrap inline_block h_100 no_drag'
			ref={setNodeRef}
			style={{ transform: CSS.Translate.toString(transform), transition }}
			{...attributes}
			{...listeners}
		>
			<Button
				className={$cx(
					'nav_bar_item_wrap h_100 border_box',
					view.active && 'active',
					view.fixed && 'is_fixed',
					isDragging && 'isDragging',
					drag_overlay && 'drag_overlay',
					is_focus && 'is_focus'
				)}
				onMouseDown={onMouseDown}
			>
				<div className='nav_bar_item w_100 h_100 border_box flex align_center'>
					<div className='icon_wrap h_100 flex align_center'>
						<Choose>
							<When condition={!!view.file.icon}>
								<Emoji
									shortcodes={view.file.icon!}
									size={12}
									hue={view.file.icon_hue}
								></Emoji>
							</When>
							<Otherwise>{module_icon[view.module]}</Otherwise>
						</Choose>
					</div>
					<span className='name_wrap ml_2'>{view.file.name}</span>
					<div
						className='btn_remove flex justify_center align_center clickable ml_2'
						onMouseDown={e => e.stopPropagation()}
						onClick={() => remove({ column: column_index, view: view_index })}
					>
						<XIcon size={12} weight='bold'></XIcon>
					</div>
				</div>
			</Button>
		</div>
	)
}

export default $app.memo(Index)
