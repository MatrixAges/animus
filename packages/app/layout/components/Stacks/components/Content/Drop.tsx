import { useDroppable } from '@dnd-kit/core'

import styles from './index.module.css'

import type { IPropsStacksContentDrop } from '@/layout'

const Index = (props: IPropsStacksContentDrop) => {
	const { column_index, direction } = props

	const { isOver, setNodeRef } = useDroppable({
		id: `column_${column_index}_${direction}`,
		data: { type: 'stack', column: column_index, split: true, direction }
	})

	return (
		<div
			className={$cx(
				'h_100 absolute top_0 transition_normal',
				`${direction}_0`,
				styles.droppable_container,
				isOver && styles.isOver
			)}
			ref={setNodeRef}
		></div>
	)
}

export default $app.memo(Index)
