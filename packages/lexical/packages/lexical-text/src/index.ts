import { TextNode } from 'lexical'

export type TextNodeWithOffset = {
	node: TextNode
	offset: number
}

export {
	$canShowPlaceholder,
	$canShowPlaceholderCurry
} from './canShowPlaceholder'
export { $findTextIntersectionFromCharacters } from './findTextIntersectionFromCharacters'
export {
	$isRootTextContentEmpty,
	$isRootTextContentEmptyCurry
} from './isRootTextContentEmpty'
export type { EntityMatch } from './registerLexicalTextEntity'
export { registerLexicalTextEntity } from './registerLexicalTextEntity'
export { $rootTextContent } from './rootTextContent'
