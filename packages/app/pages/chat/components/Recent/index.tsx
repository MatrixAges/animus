import { useMemoizedFn } from 'ahooks'

import { FileList } from '@/components'
import { ipc } from '@/utils'
import { DotsThreeVerticalIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { IPropsFileList } from '@/components'
import type { IPropsRecent } from '../../types'

const Index = (props: IPropsRecent) => {
	const { recent, setRecentItems, toggleListModal } = props

	const props_file_list: IPropsFileList = {
		className: styles.file_list,
		id: 'chat_recent',
		items: recent,
		flat: true,
		setItems: setRecentItems,
		removeItem: useMemoizedFn(id => {
			ipc.file.recent.remove.mutate({ module: 'chat', id })
		})
	}

	if (!recent.length) return

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)}>
			<div className='section_title_wrap flex justify_between align_center'>
				<h2 className='section_title'>Recent</h2>
				<div
					className='btn_action flex justify_center align_center clickable'
					onClick={toggleListModal}
				>
					<DotsThreeVerticalIcon weight='bold'></DotsThreeVerticalIcon>
				</div>
			</div>
			<FileList {...props_file_list}></FileList>
		</div>
	)
}

export default $app.memo(Index)
