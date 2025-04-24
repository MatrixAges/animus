import { pascalCase } from 'change-case'
import { lazy, useMemo, Suspense } from 'react'

import { $ } from '@website/utils'

import type { IPropsFormComponent } from '../types'

const Index = (props: IPropsFormComponent) => {
	const { column, value, disabled, use_by_filter, onChange } = props
	const { type, props: self_props } = column

	const Component = useMemo(() => lazy(() => import(`../fields/${pascalCase(type)}`)), [type])

	return (
		<Suspense fallback={null}>
			<Component
				{...{ self_props, value, disabled, onChange }}
				use_by_filter={use_by_filter}
				editing
				use_by_form
			/>
		</Suspense>
	)
}

export default $.memo(Index)
