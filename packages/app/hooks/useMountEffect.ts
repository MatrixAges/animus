import { useInsertionEffect, useRef } from 'react'
import { deepEqual } from 'stk/react'

import type { DependencyList, EffectCallback } from 'react'

export default (callback: EffectCallback, deps: DependencyList) => {
	const ref_deps = useRef<DependencyList>(null)

	useInsertionEffect(() => {
		if (deepEqual(ref_deps.current, deps)) return

		ref_deps.current = deps

		callback()
	}, deps)
}
