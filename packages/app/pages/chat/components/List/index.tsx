import { FileList } from '@/components'

import styles from './index.module.css'

import type { IPropsFileList } from '@/components'
import type { IPropsList } from '../../types'

const Index = (props: IPropsList) => {
	const { list, setListItems, removeListItem } = props

	const props_file_list: IPropsFileList = {
		className: styles.file_list,
		id: 'chat_list',
		items: list,
		flat: true,
		setItems: setListItems,
		removeItem: removeListItem
	}

	return (
		<div className={$cx('w_100', styles._local)}>
			<FileList {...props_file_list}></FileList>
		</div>
	)
}

export default $app.memo(Index)
