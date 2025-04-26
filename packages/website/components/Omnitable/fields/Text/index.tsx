import mustache from 'mustache'

import { $ } from '@website/utils'

import styles from './index.module.css'

import type { Omnitable, ComponentType } from '../../types'

const Index = (props: ComponentType<Omnitable.Text['props']>) => {
	const { value, use_by_form, disabled, item, self_props } = props
	const { format } = self_props || {}

	return (
		<span
			className={$.cx(
				'border_box',
				styles._local,
				use_by_form && styles.use_by_form,
				disabled && styles.disabled
			)}
		>
			{format ? mustache.render(format, item || {}) : value}
		</span>
	)
}

export default $.memo(Index)
