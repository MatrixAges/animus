import { Normal, Update } from './components'

import styles from './index.module.css'

const Index = () => {
	return (
		<div className={$cx('w_100 flex flex_column', styles._local)}>
			<Normal></Normal>
			<Update></Update>
		</div>
	)
}

export default $app.memo(Index)
