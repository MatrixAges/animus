import type { LexicalComposerContextType } from '@lexical/react/LexicalComposerContext'

import {
	$createParagraphNode,
	$getRoot,
	$getSelection,
	createEditor,
	EditorState,
	EditorThemeClasses,
	HTMLConfig,
	Klass,
	LexicalEditor,
	LexicalNode,
	LexicalNodeReplacement
} from 'lexical'
import { useMemo } from 'react'
import { CAN_USE_DOM } from 'shared/canUseDOM'

import { createLexicalComposerContext, LexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import useLexicalEditorEffect from './useLexicalEditorEffect'

const HISTORY_MERGE_OPTIONS = { tag: 'history-merge' }

import type { EditorRefs } from 'lexical'

export type InitialEditorStateType = null | string | EditorState | ((editor: LexicalEditor) => void)

export type InitialConfigType = Readonly<{
	editor__DEPRECATED?: LexicalEditor | null
	namespace: string
	refs: EditorRefs
	nodes?: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement>
	editable?: boolean
	theme?: EditorThemeClasses
	editorState?: InitialEditorStateType
	html?: HTMLConfig
	onError: (error: Error, editor: LexicalEditor) => void
}>

type Props = React.PropsWithChildren<{
	initialConfig: InitialConfigType
}>

export function LexicalComposer({ initialConfig, children }: Props): React.JSX.Element {
	const composerContext: [LexicalEditor, LexicalComposerContextType] = useMemo(() => {
		const {
			refs,
			theme,
			namespace,
			editor__DEPRECATED: initialEditor,
			nodes,
			editorState: initialEditorState,
			html,
			onError
		} = initialConfig

		const context: LexicalComposerContextType = createLexicalComposerContext(null, theme)

		let editor = initialEditor || null

		if (editor === null) {
			const newEditor = createEditor({
				editable: initialConfig.editable,
				html,
				namespace,
				nodes,
				onError: error => onError(error, newEditor),
				theme
			})
			initializeEditor(newEditor, initialEditorState)

			editor = newEditor
		}

		editor.refs = refs

		return [editor, context]
	}, [])
	const [editor] = composerContext

	useLexicalEditorEffect({
		mounted: () => {
			const isEditable = initialConfig.editable

			editor.setEditable(isEditable !== undefined ? isEditable : true)
		},
		editor,
		unmounted: () => {
			editor.setRootElement(null)
			editor.reset()
		},
		deps: [editor]
	})

	return <LexicalComposerContext.Provider value={composerContext}>{children}</LexicalComposerContext.Provider>
}

function initializeEditor(editor: LexicalEditor, initialEditorState?: InitialEditorStateType): void {
	if (initialEditorState === null) {
		return
	} else if (initialEditorState === undefined) {
		editor.update(() => {
			const root = $getRoot()
			if (root.isEmpty()) {
				const paragraph = $createParagraphNode()
				root.append(paragraph)
				const activeElement = CAN_USE_DOM ? document.activeElement : null
				if (
					$getSelection() !== null ||
					(activeElement !== null && activeElement === editor.getRootElement())
				) {
					paragraph.select()
				}
			}
		}, HISTORY_MERGE_OPTIONS)
	} else if (initialEditorState !== null) {
		switch (typeof initialEditorState) {
			case 'string': {
				const parsedEditorState = editor.parseEditorState(initialEditorState)
				editor.setEditorState(parsedEditorState, HISTORY_MERGE_OPTIONS)
				break
			}
			case 'object': {
				editor.setEditorState(initialEditorState, HISTORY_MERGE_OPTIONS)
				break
			}
			case 'function': {
				editor.update(() => {
					const root = $getRoot()
					if (root.isEmpty()) {
						initialEditorState(editor)
					}
				}, HISTORY_MERGE_OPTIONS)
				break
			}
		}
	}
}
