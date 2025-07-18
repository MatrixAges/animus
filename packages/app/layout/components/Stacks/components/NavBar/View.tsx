import { useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'
import { useTranslation } from 'react-i18next'

import { Icon, module_icon_string, ModuleIcon } from '@/components'
import { useScrollToItem } from '@/hooks'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { XIcon } from '@phosphor-icons/react'

import type { IPropsStacksNavBarView } from '@/layout'

const Index = (props: IPropsStacksNavBarView) => {
	const { column_index, view_index, view, focus, drag_overlay, click, remove, update } = props
	const { t } = useTranslation()

	const { attributes, listeners, transform, transition, isDragging, setNodeRef } = useSortable({
		id: view.id,
		data: { type: 'stack', column: column_index, view: view_index }
	})

	useScrollToItem(view.id, view.active, isDragging)

	const is_focus = useMemo(
		() => column_index === focus.column && view_index === focus.view,
		[column_index, view_index, focus]
	)

	const onMouseDown = useMemoizedFn(e => {
		if (e.button !== 0) return

		click({ column: column_index, view: view_index })
	})

	return (
		<div
			className='drag_wrap inline_block h_100 no_drag'
			ref={setNodeRef}
			style={{ transform: CSS.Translate.toString(transform), transition }}
			{...attributes}
			{...listeners}
		>
			<div
				className={$cx(
					'nav_bar_item_wrap h_100 border_box flex align_center clickit',
					view.active && 'active',
					isDragging && 'isDragging',
					drag_overlay && 'drag_overlay',
					is_focus && 'is_focus'
				)}
				onMouseDown={onMouseDown}
			>
				<div className='nav_bar_item w_100 border_box flex align_center'>
					<Choose>
						<When condition={view.type === 'page'}>
							<span className='icon_wrap flex align_center'>
								<ModuleIcon module={view.module} weight='fill'></ModuleIcon>
							</span>
							<span className='name_wrap'>{t(`app.module.${view.module}`)}</span>
						</When>
						<Otherwise>
							<span className='icon_wrap flex align_center'>
								<Icon id={view.icon ?? module_icon_string[view.module]}></Icon>
							</span>
							<span className='name_wrap'>{view.name.slice(0, 15)}</span>
						</Otherwise>
					</Choose>
					<div
						className='btn_remove flex justify_center align_center clickit'
						onMouseDown={e => e.stopPropagation()}
						onClick={() => remove({ column: column_index, view: view_index })}
					>
						<XIcon size={12} weight='bold'></XIcon>
					</div>
				</div>
			</div>
		</div>
	)
}

export default $app.memo(Index)
