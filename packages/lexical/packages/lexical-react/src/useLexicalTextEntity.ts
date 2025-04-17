import type { EntityMatch } from '@lexical/text'
import type { Klass, TextNode } from 'lexical'

import { useEffect } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { registerLexicalTextEntity } from '@lexical/text'
import { mergeRegister } from '@lexical/utils'

export function useLexicalTextEntity<T extends TextNode>(
	getMatch: (text: string) => null | EntityMatch,
	targetNode: Klass<T>,
	createNode: (textNode: TextNode) => T
): void {
	const [editor] = useLexicalComposerContext()

	useEffect(() => {
		return mergeRegister(...registerLexicalTextEntity(editor, getMatch, targetNode, createNode))
	}, [createNode, editor, getMatch, targetNode])
}
