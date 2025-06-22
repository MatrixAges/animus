import { lazy, Suspense, useMemo } from 'react'

import type { Module } from '@/types'

interface IProps {
	module: Module
	props: { id: string }
}

const Index = (_props: IProps) => {
	const { module, props } = _props

	const Component = useMemo(() => lazy(() => import(`../pages/${module}/page`)), [module])

	return (
		<Suspense fallback={null}>
			<Component {...props} />
		</Suspense>
	)
}

export default $app.memo(Index)
