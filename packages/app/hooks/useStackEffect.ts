import { useLayoutEffect, useRef } from 'react'
import { useMemoizedFn } from 'ahooks'
import { deepEqual } from 'stk/react'

import { useStackId } from '@/hooks'

import type { DependencyList } from 'react'

interface Args {
	mounted: (args: { bind: (v: HTMLDivElement) => void }) => void
	unmounted?: () => void
	onShow?: () => void
	deps?: DependencyList
}

export default (args: Args) => {
	const { mounted, unmounted, onShow, deps = [] } = args
	const ref_dom = useRef<HTMLDivElement | null>(null)
	const ref_deps = useRef<DependencyList>(null)
	const id = useStackId()

	const bind = useMemoizedFn((v: HTMLDivElement) => {
		if (!v) return

		ref_dom.current = v
	})

	useLayoutEffect(() => {
		if (deepEqual(ref_deps.current, deps)) return

		ref_deps.current = deps

		mounted({ bind })
	}, deps)

	useLayoutEffect(() => {
		if (!unmounted) {
			if (!onShow) return

			setTimeout(() => {
				if (ref_dom.current?.isConnected) {
					onShow()
				}
			}, 0)

			return
		}

		if (!id) return unmounted

		return () => {
			setTimeout(() => {
				if (ref_dom.current?.isConnected) {
					onShow?.()

					const offs = $stack_offs.get(id)

					if (offs) {
						if (!offs.has(unmounted)) offs.add(unmounted)
					} else {
						const set = new Set<() => void>()

						set.add(unmounted)

						$stack_offs.set(id, set)
					}
				} else {
					unmounted()
				}
			}, 0)
		}
	}, [id])

	return { bind }
}
