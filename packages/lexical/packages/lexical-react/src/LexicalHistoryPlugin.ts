import type { HistoryState } from '@lexical/history'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import { useHistory } from './shared/useHistory'

export { createEmptyHistoryState } from '@lexical/history'

export type { HistoryState }

export function HistoryPlugin({
	delay,
	externalHistoryState
}: {
	delay?: number
	externalHistoryState?: HistoryState
}): null {
	const [editor] = useLexicalComposerContext()

	useHistory(editor, externalHistoryState, delay)

	return null
}
