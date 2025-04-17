import type { EditorConfig } from 'lexical'

import { ElementNode } from './LexicalElementNode'

// TODO: Cleanup ArtificialNode__DO_NOT_USE #5966
export class ArtificialNode__DO_NOT_USE extends ElementNode {
	static getType(): string {
		return 'artificial'
	}

	createDOM(config: EditorConfig): HTMLElement {
		// this isnt supposed to be used and is not used anywhere but defining it to appease the API
		const dom = document.createElement('div')
		return dom
	}
}
