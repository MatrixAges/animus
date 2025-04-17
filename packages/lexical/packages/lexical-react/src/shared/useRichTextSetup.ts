import { useState } from 'react'

import { registerRichText } from '@lexical/rich-text'
import { mergeRegister } from '@lexical/utils'

import useLexicalEditorEffect from '../useLexicalEditorEffect'

import type { LexicalEditor } from 'lexical'

export function useRichTextSetup(editor: LexicalEditor): void {
	const [unmounted, setUnmounted] = useState<() => void>()

	useLexicalEditorEffect({
		mounted: () => {
			setUnmounted(() => mergeRegister(registerRichText(editor)))
		},
		unmounted,
		editor,
		deps: [editor]
	})
}
