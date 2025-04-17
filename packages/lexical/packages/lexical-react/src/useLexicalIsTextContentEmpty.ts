import type { LexicalEditor } from 'lexical'

import { useState } from 'react'
import useLayoutEffect from 'shared/useLayoutEffect'

import { $isRootTextContentEmptyCurry } from '@lexical/text'

export function useLexicalIsTextContentEmpty(editor: LexicalEditor, trim?: boolean): boolean {
	const [isEmpty, setIsEmpty] = useState(
		editor.getEditorState().read($isRootTextContentEmptyCurry(editor.isComposing(), trim))
	)

	useLayoutEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			const isComposing = editor.isComposing()
			const currentIsEmpty = editorState.read($isRootTextContentEmptyCurry(isComposing, trim))
			setIsEmpty(currentIsEmpty)
		})
	}, [editor, trim])

	return isEmpty
}
