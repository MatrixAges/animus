import type { Transformer } from '@lexical/markdown'

import { useEffect } from 'react'

import { registerMarkdownShortcuts, TRANSFORMERS } from '@lexical/markdown'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

export function MarkdownShortcutPlugin({
	transformers = TRANSFORMERS
}: Readonly<{
	transformers?: Array<Transformer>
}>): null {
	const [editor] = useLexicalComposerContext()

	useEffect(() => {
		return registerMarkdownShortcuts(editor, transformers)
	}, [editor, transformers])

	return null
}
