import Omnitable from '@website/components/Omnitable/Dy'
import { config } from '@website/components/Omnitable/test_config'

import styles from './index.module.css'

const Index = () => {
	return (
		<div className={styles._local}>
			<Omnitable {...config}></Omnitable>
		</div>
	)
}

export default Index
