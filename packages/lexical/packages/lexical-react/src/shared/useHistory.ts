import type { HistoryState } from '@lexical/history'
import type { LexicalEditor } from 'lexical'

import { useEffect, useMemo } from 'react'

import { createEmptyHistoryState, registerHistory } from '@lexical/history'

export function useHistory(editor: LexicalEditor, externalHistoryState?: HistoryState, delay = 1200): void {
	const historyState: HistoryState = useMemo(
		() => externalHistoryState || createEmptyHistoryState(),
		[externalHistoryState]
	)

	useEffect(() => {
		return registerHistory(editor, historyState, delay)
	}, [delay, editor, historyState])
}
