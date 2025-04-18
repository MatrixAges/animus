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
	contentEditable: React.JSX.Element
	placeholder?: ((isEditable: boolean) => null | React.JSX.Element) | null | React.JSX.Element
	ErrorBoundary: ErrorBoundaryType
}): React.JSX.Element {
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
	content: ((isEditable: boolean) => null | React.JSX.Element) | null | React.JSX.Element
}): null | React.JSX.Element {
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
