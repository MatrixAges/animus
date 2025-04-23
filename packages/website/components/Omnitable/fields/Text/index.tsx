import { $ } from '@website/utils'

import styles from './index.module.css'

import type { Omnitable, ComponentType } from '../../types'

const Index = (props: ComponentType<Omnitable.Text['props']>) => {
	const { value } = props

	return <span className={$.cx(styles._local)}>{value}</span>
}

export default $.memo(Index)
