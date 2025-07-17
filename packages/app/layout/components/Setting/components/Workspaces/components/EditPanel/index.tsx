import { useDynamicList, useMemoizedFn } from 'ahooks'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { useGlobal } from '@/context'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { FloppyDiskIcon, PlusIcon } from '@phosphor-icons/react'

import Item from './Item'

import styles from './index.module.css'

import type { DragEndEvent } from '@dnd-kit/core'

interface IProps {
	onClose: () => void
}

const Index = (props: IProps) => {
	const { onClose } = props
	const global = useGlobal()
	const { t } = useTranslation()

	const app = global.app
	const workspaces = $copy(app.workspaces)
	const workspace = app.workspace

	const { list, remove, getKey, replace, push, move } = useDynamicList(workspaces)

	const save = useMemoizedFn(() => {
		app.setWorkspaces(list)

		onClose()
	})

	const onDragEnd = useMemoizedFn(({ active, over }: DragEndEvent) => {
		if (!over) return

		move(active.data.current!.index, over.data.current!.index)
	})

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)}>
			<div className='workspace_items w_100 border_box flex flex_column'>
				<DndContext onDragEnd={onDragEnd}>
					<SortableContext
						items={list.map((item, index) => ({ ...item, id: getKey(index) }))}
						strategy={verticalListSortingStrategy}
					>
						{list.map((item, index) => (
							<Item
								{...{ workspaces, workspace, item, index, getKey, remove, replace }}
								key={getKey(index)}
							></Item>
						))}
					</SortableContext>
				</DndContext>
			</div>
			<div className='w_100 border_box flex actions_wrap'>
				<Button
					className='btn w_100'
					icon={<PlusIcon weight='bold'></PlusIcon>}
					onClick={() => push({ icon: '', icon_type: 'icon', name: '' })}
				>
					{t('add')}
				</Button>
				<Button
					className='btn w_100'
					icon={<FloppyDiskIcon weight='bold'></FloppyDiskIcon>}
					onClick={save}
				>
					{t('save')}
				</Button>
			</div>
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
