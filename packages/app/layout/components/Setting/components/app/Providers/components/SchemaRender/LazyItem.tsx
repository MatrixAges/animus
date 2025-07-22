import { lazy, Suspense, useMemo } from 'react'

interface IProps {
	type: string
}

const Index = (_props: IProps) => {
	const { type } = _props

	const Component = useMemo(() => lazy(() => import(`./components/${type}`)), [type])

	return (
		<Suspense fallback={null}>
			<Component />
		</Suspense>
	)
}

export default $app.memo(Index)
