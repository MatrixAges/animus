import { useMemoizedFn } from 'ahooks'
import { useTranslation } from 'react-i18next'

import { Empty, FileList } from '@/components'
import { ipc } from '@/utils'
import { DotsThreeVerticalIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { IPropsFileList } from '@/components'
import type { IPropsRecent } from '../../types'

const Index = (props: IPropsRecent) => {
	const { recent, setRecentItems, toggleListModal } = props
	const { t } = useTranslation()

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

	return (
		<div className='w_100 border_box flex flex_column'>
			<div className='section_title_wrap flex justify_between align_center'>
				<h2 className='section_title'>{t('recent')}</h2>
				<div
					className='btn_action flex justify_center align_center clickable'
					onClick={toggleListModal}
				>
					<DotsThreeVerticalIcon weight='bold'></DotsThreeVerticalIcon>
				</div>
			</div>
			<Choose>
				<When condition={recent.length}>
					<FileList {...props_file_list}></FileList>
				</When>
				<Otherwise>
					<div
						className={$cx(
							'w_100 border_box flex justify_center align_center',
							styles.empty_wrap
						)}
					>
						<Empty></Empty>
					</div>
				</Otherwise>
			</Choose>
		</div>
	)
}

export default $app.memo(Index)
