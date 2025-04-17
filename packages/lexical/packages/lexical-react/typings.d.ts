declare global {
	interface Window {
		$stack_offs: Map<string, Set<() => void>>

		__key__: () => string
	}

	let $stack_offs: Map<string, Set<() => void>>
}

export {}
