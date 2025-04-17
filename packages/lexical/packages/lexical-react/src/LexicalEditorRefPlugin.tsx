import { LexicalEditor } from 'lexical'
import { useEffect } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import type { MutableRefObject, RefCallback } from 'react'

export function EditorRefPlugin({
	editorRef
}: {
	editorRef: RefCallback<LexicalEditor> | MutableRefObject<LexicalEditor | null | undefined>
}): null {
	const [editor] = useLexicalComposerContext()

	useEffect(() => {
		if (typeof editorRef === 'function') {
			editorRef(editor)
		} else if (typeof editorRef === 'object') {
			editorRef.current = editor
		}
	}, [editor])

	return null
}
