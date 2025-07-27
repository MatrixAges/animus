import { useMemoizedFn } from 'ahooks'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { id } from 'stk/common'

import { Empty, LLM } from '@/components'
import { capitalizeFirst, confirm } from '@/utils'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { PlusIcon, TrashIcon } from '@phosphor-icons/react'

import ModelItem from './ModelItem'

import type { DragEndEvent } from '@dnd-kit/core'
import type { Model } from 'fst/llm'
import type { IPropsFormGroupItem } from '../../types'

const { Item, List, useFormInstance } = Form

const Index = (props: IPropsFormGroupItem) => {
	const { group, group_index, removeGroup } = props
	const { t } = useTranslation()
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
	const { setFieldValue } = useFormInstance()

	const onRemove = useMemoizedFn(async () => {
		const res = await confirm({ title: t('notice'), content: t('config_remove_confirm'), zIndex: 1000000 })

		if (!res) return

		removeGroup(group_index)
	})

	const onDragEnd = useMemoizedFn(({ active, over }: DragEndEvent) => {
		if (!over) return

		const items = arrayMove(group.items, active.data.current!.index, over.data.current!.index)

		setFieldValue(['models', group_index, 'items'], items)
	})

	return (
		<div className='group_item_wrap w_100 flex flex_column relative'>
			<Item name={[group_index, 'group']} noStyle>
				<Input className='group_name absolute' placeholder='Group name' maxLength={18}></Input>
			</Item>
			<List name={[group_index, 'items']}>
				{(model_items, { add, remove }) => (
					<div className='group_item w_100 border_box flex flex_column'>
						<div className='header w_100 border_box flex justify_between align_center'>
							<div className='group flex align_center'>
								<LLM name={group.group}></LLM>
							</div>
							<div className='right_wrap flex align_center'>
								<button
									className='btn_remove btn none flex align_center clickable'
									onClick={onRemove}
								>
									<TrashIcon weight='bold' size={10}></TrashIcon>
									<span>{t('remove')}</span>
								</button>
								<button
									className='btn flex align_center clickable'
									onClick={() => {
										const suffix = id({ size: 3 }).toLowerCase()

										add({
											enabled: false,
											id: group.group?.toLowerCase() + '-' + suffix,
											name:
												capitalizeFirst(group.group) +
												' ' +
												capitalizeFirst(suffix),
											features: {
												function_calling: true,
												structured_output: true
											}
										} as Model)
									}}
								>
									<PlusIcon weight='bold'></PlusIcon>
									<span>{t('model')}</span>
								</button>
							</div>
						</div>
						<Choose>
							<When condition={group.items.length}>
								<div className='model_items w_100 border_box flex flex_wrap'>
									<DndContext sensors={sensors} onDragEnd={onDragEnd}>
										<SortableContext
											items={group.items}
											strategy={rectSortingStrategy}
										>
											{model_items.map(({ name: model_index }, index) => {
												const item = group.items[index]

												return (
													<ModelItem
														item={item}
														group_index={group_index}
														model_index={model_index}
														remove={remove}
														key={item.id}
													></ModelItem>
												)
											})}
										</SortableContext>
									</DndContext>
								</div>
							</When>
							<Otherwise>
								<div className='empty_wrap for_model w_100 flex justify_center align_center'>
									<Empty></Empty>
								</div>
							</Otherwise>
						</Choose>
					</div>
				)}
			</List>
		</div>
	)
}

export default $app.memo(Index)
