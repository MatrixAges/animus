import { $getRoot } from 'lexical'

/**
 * Returns the root's text content.
 * @returns The root's text content.
 */
export function $rootTextContent(): string {
	const root = $getRoot()

	return root.getTextContent()
}
