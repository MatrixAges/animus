import { SlidersHorizontalIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

const Index = () => {
	return (
		<div className={$cx('option_item flex justify_center align_center clickit', styles._local)}>
			<SlidersHorizontalIcon></SlidersHorizontalIcon>
		</div>
	)
}

export default $app.memo(Index)
