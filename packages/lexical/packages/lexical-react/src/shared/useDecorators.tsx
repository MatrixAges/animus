import React, { useMemo, useRef, useState, Suspense } from 'react'
import { createPortal, flushSync } from 'react-dom'

import useLexicalEditorEffect from '../useLexicalEditorEffect'

import type { LexicalEditor, NodeKey } from 'lexical'

type ErrorBoundaryProps = {
	children: React.JSX.Element
	onError: (error: Error) => void
}

export type ErrorBoundaryType = React.ComponentClass<ErrorBoundaryProps> | React.FC<ErrorBoundaryProps>

export function useDecorators(editor: LexicalEditor, ErrorBoundary: ErrorBoundaryType): Array<React.JSX.Element> {
	const [decorators, setDecorators] = useState<Record<NodeKey, React.JSX.Element>>(() =>
		editor.getDecorators<React.JSX.Element>()
	)
	const [unmounted, setUnmounted] = useState<() => void>()

	useLexicalEditorEffect({
		mounted: () => {
			setUnmounted(() =>
				editor.registerDecoratorListener<React.JSX.Element>(nextDecorators => {
					flushSync(() => {
						setDecorators(nextDecorators)
					})
				})
			)
		},
		unmounted,
		editor,
		deps: [editor]
	})

	useLexicalEditorEffect({
		mounted: () => {
			setDecorators(editor.getDecorators())
		},
		editor,
		deps: [editor]
	})

	return useMemo(() => {
		const decoratedPortals = []
		const decoratorKeys = Object.keys(decorators)

		for (let i = 0; i < decoratorKeys.length; i++) {
			const nodeKey = decoratorKeys[i]
			const reactDecorator = (
				<ErrorBoundary onError={e => editor._onError(e)}>
					<Suspense fallback={null}>{decorators[nodeKey]}</Suspense>
				</ErrorBoundary>
			)
			const element = editor.getElementByKey(nodeKey)

			if (element !== null) {
				decoratedPortals.push(createPortal(reactDecorator, element, nodeKey))
			}
		}

		return decoratedPortals
	}, [ErrorBoundary, decorators, editor])
}
