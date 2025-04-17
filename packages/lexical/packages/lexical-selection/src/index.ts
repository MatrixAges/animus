import {
	$addNodeStyle,
	$cloneWithProperties,
	$isAtNodeEnd,
	$patchStyleText,
	$sliceSelectedTextNodeContent,
	$trimTextContentFromAnchor
} from './lexical-node'
import {
	$getSelectionStyleValueForProperty,
	$isParentElementRTL,
	$moveCaretSelection,
	$moveCharacter,
	$selectAll,
	$setBlocksType,
	$shouldOverrideDefaultCharacterSelection,
	$wrapNodes
} from './range-selection'
import { createDOMRange, createRectsFromDOMRange, getCSSFromStyleObject, getStyleObjectFromCSS } from './utils'

export {
	$addNodeStyle,
	$cloneWithProperties,
	$isAtNodeEnd,
	$patchStyleText,
	$sliceSelectedTextNodeContent,
	$trimTextContentFromAnchor
}
/** @deprecated renamed to {@link $trimTextContentFromAnchor} by @lexical/eslint-plugin rules-of-lexical */
export const trimTextContentFromAnchor = $trimTextContentFromAnchor

export {
	$getSelectionStyleValueForProperty,
	$isParentElementRTL,
	$moveCaretSelection,
	$moveCharacter,
	$selectAll,
	$setBlocksType,
	$shouldOverrideDefaultCharacterSelection,
	$wrapNodes
}

export { createDOMRange, createRectsFromDOMRange, getCSSFromStyleObject, getStyleObjectFromCSS }
