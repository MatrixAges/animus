import * as React from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useLexicalEditable } from '@lexical/react/useLexicalEditable'

import { useCanShowPlaceholder } from './shared/useCanShowPlaceholder'
import { useDecorators, ErrorBoundaryType } from './shared/useDecorators'
import { usePlainTextSetup } from './shared/usePlainTextSetup'

export function PlainTextPlugin({
	contentEditable,
	// TODO Remove. This property is now part of ContentEditable
	placeholder = null,
	ErrorBoundary
}: {
	contentEditable: JSX.Element
	placeholder?: ((isEditable: boolean) => null | JSX.Element) | null | JSX.Element
	ErrorBoundary: ErrorBoundaryType
}): JSX.Element {
	const [editor] = useLexicalComposerContext()
	const decorators = useDecorators(editor, ErrorBoundary)
	usePlainTextSetup(editor)

	return (
		<>
			{contentEditable}
			<Placeholder content={placeholder} />
			{decorators}
		</>
	)
}

// TODO Remove
function Placeholder({
	content
}: {
	content: ((isEditable: boolean) => null | JSX.Element) | null | JSX.Element
}): null | JSX.Element {
	const [editor] = useLexicalComposerContext()
	const showPlaceholder = useCanShowPlaceholder(editor)
	const editable = useLexicalEditable()

	if (!showPlaceholder) {
		return null
	}

	if (typeof content === 'function') {
		return content(editable)
	} else {
		return content
	}
}
