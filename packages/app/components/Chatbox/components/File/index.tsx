import { PlusIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { IPropsFile } from '../../types'

const Index = (props: IPropsFile) => {
	const {} = props

	return (
		<div className={$cx('option_item flex justify_center align_center clickit', styles._local)}>
			<PlusIcon></PlusIcon>
		</div>
	)
}

export default $app.memo(Index)
