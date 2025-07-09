import { lazy, Suspense, useMemo } from 'react'

import type { Module, Stack } from '@/types'

interface IProps {
	module: Module
	props: Stack.ModuleProps
}

const Index = (_props: IProps) => {
	const { module, props } = _props

	const Component = useMemo(() => lazy(() => import(`@/modules/${module}/id`)), [module])

	return (
		<Suspense fallback={null}>
			<Component {...props} />
		</Suspense>
	)
}

export default $app.memo(Index)
