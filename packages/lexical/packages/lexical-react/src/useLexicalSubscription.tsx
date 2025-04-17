import type { LexicalEditor } from 'lexical'

import { useMemo, useRef, useState } from 'react'
import useLayoutEffect from 'shared/useLayoutEffect'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

export type LexicalSubscription<T> = {
	initialValueFn: () => T
	subscribe: (callback: (value: T) => void) => () => void
}

/**
 * Shortcut to Lexical subscriptions when values are used for render.
 * @param subscription - The function to create the {@link LexicalSubscription}. This function's identity must be stable (e.g. defined at module scope or with useCallback).
 */
export function useLexicalSubscription<T>(subscription: (editor: LexicalEditor) => LexicalSubscription<T>): T {
	const [editor] = useLexicalComposerContext()
	const initializedSubscription = useMemo(() => subscription(editor), [editor, subscription])
	const valueRef = useRef<T>(initializedSubscription.initialValueFn())
	const [value, setValue] = useState<T>(valueRef.current)
	useLayoutEffect(() => {
		const { initialValueFn, subscribe } = initializedSubscription
		const currentValue = initialValueFn()
		if (valueRef.current !== currentValue) {
			valueRef.current = currentValue
			setValue(currentValue)
		}

		return subscribe((newValue: T) => {
			valueRef.current = newValue
			setValue(newValue)
		})
	}, [initializedSubscription, subscription])

	return value
}

/** @deprecated use the named export {@link useLexicalSubscription} */
// eslint-disable-next-line no-restricted-exports
export default useLexicalSubscription
