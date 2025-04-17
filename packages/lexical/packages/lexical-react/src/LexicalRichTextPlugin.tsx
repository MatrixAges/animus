import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useLexicalEditable } from '@lexical/react/useLexicalEditable'

import { useCanShowPlaceholder } from './shared/useCanShowPlaceholder'
import { useDecorators, ErrorBoundaryType } from './shared/useDecorators'
import { useRichTextSetup } from './shared/useRichTextSetup'

export function RichTextPlugin({
	contentEditable,
	placeholder = null,
	ErrorBoundary
}: {
	contentEditable: JSX.Element
	placeholder?: ((isEditable: boolean) => null | JSX.Element) | null | JSX.Element
	ErrorBoundary: ErrorBoundaryType
}): JSX.Element {
	const [editor] = useLexicalComposerContext()
	const decorators = useDecorators(editor, ErrorBoundary)

	useRichTextSetup(editor)

	return (
		<>
			{contentEditable}
			<Placeholder content={placeholder} />
			{decorators}
		</>
	)
}

// TODO remove
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
