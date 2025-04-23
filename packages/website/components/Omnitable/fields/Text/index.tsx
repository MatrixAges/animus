import { $ } from '@website/utils'

import styles from './index.module.css'

import type { ComponentType } from '../../types'

const Index = (props: ComponentType) => {
	const { value } = props

	return <span className={$.cx(styles._local)}>{value}</span>
}

export default $.memo(Index)
