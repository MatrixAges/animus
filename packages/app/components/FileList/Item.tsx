import dayjs from 'dayjs'

import { IconPicker } from '@/components'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import type { FileIndex } from '@desktop/schemas'
import type { FocusEvent, ReactNode } from 'react'
import type { IProps as IPropsFileList } from '.'

interface IProps extends Pick<IPropsFileList, 'flat' | 'sortable'> {
	item: FileIndex
	index: number
	focusing: boolean
	getIcon: (item: FileIndex, focusing?: boolean) => ReactNode
	onChangeIcon: (v: string, type: 'icon' | 'emoji') => void
	onChangeName: (e: FocusEvent<HTMLInputElement>) => void
}

const Index = (props: IProps) => {
	const { item, index, focusing, flat, sortable, getIcon, onChangeIcon, onChangeName } = props

	const { attributes, listeners, transform, transition, setNodeRef } = useSortable({
		id: item.id,
		data: { index },
		disabled: !sortable || focusing
	})

	return (
		<div
			className={$cx(
				'w_100 border_box list_item_wrap flex align_center',
				focusing ? 'focusing' : 'clickit',
				flat && 'flat justify_between'
			)}
			style={{ transform: CSS.Translate.toString(transform), transition }}
			data-key={index}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
		>
			<div className='left_wrap w_100 border_box flex align_center'>
				<Choose>
					<When condition={focusing}>
						<IconPicker placement='right' hide_arrow onSelect={onChangeIcon}>
							<div>{getIcon(item, true)}</div>
						</IconPicker>
						<input
							className='name line_clamp_1 border_box'
							defaultValue={item.name}
							onBlur={onChangeName}
						/>
					</When>
					<Otherwise>
						{getIcon(item)}
						<span className='name line_clamp_1'>{item.name}</span>
					</Otherwise>
				</Choose>
			</div>
			<If condition={flat}>
				<span className='create_at text_right'>{dayjs(item.create_at).fromNow()}</span>
			</If>
		</div>
	)
}

export default $app.memo(Index)
