import dayjs from 'dayjs'

import { $ } from '@website/utils'

import styles from './index.module.css'

import type { Omnitable, ComponentType } from '../../types'

const Index = (props: ComponentType<Omnitable.Date['props']>) => {
	const { self_props, value } = props
	const { format } = self_props || {}

	return <span className={$.cx(styles._local)}>{dayjs(value).format(format || 'YYYY-MM-DD')}</span>
}

export default $.memo(Index)
