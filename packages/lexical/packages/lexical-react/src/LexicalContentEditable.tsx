import type { Props as ElementProps } from './shared/LexicalContentEditableElement'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useLexicalEditable } from '@lexical/react/useLexicalEditable'

import { ContentEditableElement } from './shared/LexicalContentEditableElement'
import { useCanShowPlaceholder } from './shared/useCanShowPlaceholder'

/* eslint-disable @typescript-eslint/ban-types */
export type Props = (
	| {}
	| {
			'aria-placeholder': string
			placeholder: ((isEditable: boolean) => null | React.JSX.Element) | null | React.JSX.Element
	  }
) &
	ElementProps
/* eslint-enable @typescript-eslint/ban-types */

export function ContentEditable(props: Props): React.JSX.Element {
	let placeholder = null
	let rest = props
	if ('placeholder' in props) {
		;({ placeholder, ...rest } = props)
	}

	return (
		<>
			<ContentEditableElement {...rest} />
			<Placeholder content={placeholder} />
		</>
	)
}

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

	let placeholder = null
	if (typeof content === 'function') {
		placeholder = content(editable)
	} else if (content !== null) {
		placeholder = content
	}

	if (placeholder === null) {
		return null
	}
	return <div aria-hidden={true}>{placeholder}</div>
}
