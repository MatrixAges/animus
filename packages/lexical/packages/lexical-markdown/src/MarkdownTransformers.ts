import type { ListType } from '@lexical/list'
import type { HeadingTagType } from '@lexical/rich-text'

import { $createTextNode, $isTextNode, ElementNode, Klass, LexicalNode, TextFormatType, TextNode } from 'lexical'

import { $createLinkNode, $isLinkNode, LinkNode } from '@lexical/link'
import {
	$createListItemNode,
	$createListNode,
	$isListItemNode,
	$isListNode,
	ListItemNode,
	ListNode
} from '@lexical/list'
import { $createHeadingNode, $isHeadingNode, HeadingNode } from '@lexical/rich-text'

export type Transformer = ElementTransformer | TextFormatTransformer | TextMatchTransformer

export type ElementTransformer = {
	dependencies: Array<Klass<LexicalNode>>
	export: (
		node: LexicalNode,
		// eslint-disable-next-line no-shadow
		traverseChildren: (node: ElementNode) => string
	) => string | null
	regExp: RegExp
	replace: (parentNode: ElementNode, children: Array<LexicalNode>, match: Array<string>, isImport: boolean) => void
	type: 'element'
}

export type TextFormatTransformer = Readonly<{
	format: ReadonlyArray<TextFormatType>
	tag: string
	intraword?: boolean
	type: 'text-format'
}>

export type TextMatchTransformer = Readonly<{
	dependencies: Array<Klass<LexicalNode>>
	export?: (
		node: LexicalNode,
		// eslint-disable-next-line no-shadow
		exportChildren: (node: ElementNode) => string,
		// eslint-disable-next-line no-shadow
		exportFormat: (node: TextNode, textContent: string) => string
	) => string | null
	importRegExp?: RegExp
	regExp: RegExp
	replace?: (node: TextNode, match: RegExpMatchArray, anchorOffset?: number) => void
	trigger?: string
	useAllText?: boolean
	keyPair?: boolean
	type: 'text-match'
}>

const createBlockNode = (createNode: (match: Array<string>) => ElementNode): ElementTransformer['replace'] => {
	return (parentNode, children, match) => {
		const node = createNode(match)
		node.append(...children)
		parentNode.replace(node)
		node.select(0, 0)
	}
}

// Amount of spaces that define indentation level
// TODO: should be an option
const LIST_INDENT_SIZE = 4

function getIndent(whitespaces: string): number {
	const tabs = whitespaces.match(/\t/g)
	const spaces = whitespaces.match(/ /g)

	let indent = 0

	if (tabs) {
		indent += tabs.length
	}

	if (spaces) {
		indent += Math.floor(spaces.length / LIST_INDENT_SIZE)
	}

	return indent
}

const listReplace = (listType: ListType): ElementTransformer['replace'] => {
	return (parentNode, children, match) => {
		const previousNode = parentNode.getPreviousSibling()
		const nextNode = parentNode.getNextSibling()
		const listItem = $createListItemNode(listType === 'check' ? match[3] === 'x' : undefined)
		if ($isListNode(nextNode) && nextNode.getListType() === listType) {
			const firstChild = nextNode.getFirstChild()
			if (firstChild !== null) {
				firstChild.insertBefore(listItem)
			} else {
				// should never happen, but let's handle gracefully, just in case.
				nextNode.append(listItem)
			}
			parentNode.remove()
		} else if ($isListNode(previousNode) && previousNode.getListType() === listType) {
			previousNode.append(listItem)
			parentNode.remove()
		} else {
			const list = $createListNode(listType, listType === 'number' ? Number(match[2]) : undefined)
			list.append(listItem)
			parentNode.replace(list)
		}
		listItem.append(...children)
		listItem.select(0, 0)
		const indent = getIndent(match[1])
		if (indent) {
			listItem.setIndent(indent)
		}
	}
}

const listExport = (listNode: ListNode, exportChildren: (node: ElementNode) => string, depth: number): string => {
	const output = []
	const children = listNode.getChildren()
	let index = 0
	for (const listItemNode of children) {
		if ($isListItemNode(listItemNode)) {
			if (listItemNode.getChildrenSize() === 1) {
				const firstChild = listItemNode.getFirstChild()
				if ($isListNode(firstChild)) {
					output.push(listExport(firstChild, exportChildren, depth + 1))
					continue
				}
			}
			const indent = ' '.repeat(depth * LIST_INDENT_SIZE)
			const listType = listNode.getListType()
			const prefix =
				listType === 'number'
					? `${listNode.getStart() + index}. `
					: listType === 'check'
						? `- [${listItemNode.getChecked() ? 'x' : ' '}] `
						: '- '
			output.push(indent + prefix + exportChildren(listItemNode))
			index++
		}
	}

	return output.join('\n')
}

export const HEADING: ElementTransformer = {
	dependencies: [HeadingNode],
	export: (node, exportChildren) => {
		if (!$isHeadingNode(node)) {
			return null
		}
		const level = Number(node.getTag().slice(1))
		return '#'.repeat(level) + ' ' + exportChildren(node)
	},
	regExp: /^(#{1,6})\s/,
	replace: createBlockNode(match => {
		const tag = ('h' + match[1].length) as HeadingTagType
		return $createHeadingNode(tag)
	}),
	type: 'element'
}

export const UNORDERED_LIST: ElementTransformer = {
	type: 'element',
	regExp: /^(\s*)[-*+]\s/,
	dependencies: [ListNode, ListItemNode],
	export: (node, exportChildren) => {
		return $isListNode(node) ? listExport(node, exportChildren, 0) : null
	},
	replace(parent, children, match, is_import) {
		if ($isHeadingNode(parent)) return

		listReplace('bullet')(parent, children, match, is_import)
	}
}

export const ORDERED_LIST: ElementTransformer = {
	type: 'element',
	regExp: /^(\s*)(\d{1,})\.\s/,
	dependencies: [ListNode, ListItemNode],
	export: (node, exportChildren) => {
		return $isListNode(node) ? listExport(node, exportChildren, 0) : null
	},
	replace(parent, children, match, is_import) {
		if ($isHeadingNode(parent)) return

		listReplace('number')(parent, children, match, is_import)
	}
}

export const CHECK_LIST: ElementTransformer = {
	type: 'element',
	regExp: /^(\s*)(?:-\s)?\s?(\[(\s|x)?\])\s/i,
	dependencies: [ListNode, ListItemNode],
	export: (node, exportChildren) => {
		return $isListNode(node) ? listExport(node, exportChildren, 0) : null
	},
	replace(parent, children, match, is_import) {
		if ($isHeadingNode(parent)) return

		listReplace('check')(parent, children, match, is_import)
	}
}

export const INLINE_CODE: TextFormatTransformer = {
	format: ['code'],
	tag: '`',
	type: 'text-format'
}

export const HIGHLIGHT: TextFormatTransformer = {
	format: ['highlight'],
	tag: '==',
	type: 'text-format'
}

export const BOLD_ITALIC_STAR: TextFormatTransformer = {
	format: ['bold', 'italic'],
	tag: '***',
	type: 'text-format'
}

export const BOLD_ITALIC_UNDERSCORE: TextFormatTransformer = {
	format: ['bold', 'italic'],
	intraword: false,
	tag: '___',
	type: 'text-format'
}

export const BOLD_STAR: TextFormatTransformer = {
	format: ['bold'],
	tag: '**',
	type: 'text-format'
}

export const BOLD_UNDERSCORE: TextFormatTransformer = {
	format: ['bold'],
	intraword: false,
	tag: '__',
	type: 'text-format'
}

export const STRIKETHROUGH: TextFormatTransformer = {
	format: ['strikethrough'],
	tag: '~~',
	type: 'text-format'
}

export const ITALIC_STAR: TextFormatTransformer = {
	format: ['italic'],
	tag: '*',
	type: 'text-format'
}

export const ITALIC_UNDERSCORE: TextFormatTransformer = {
	format: ['italic'],
	intraword: false,
	tag: '_',
	type: 'text-format'
}

// Order of text transformers matters:
//
// - code should go first as it prevents any transformations inside
// - then longer tags match (e.g. ** or __ should go before * or _)
export const LINK: TextMatchTransformer = {
	dependencies: [LinkNode],
	export: (node, exportChildren, exportFormat) => {
		if (!$isLinkNode(node)) {
			return null
		}
		const title = node.getTitle()
		const linkContent = title
			? `[${node.getTextContent()}](${node.getURL()} "${title}")`
			: `[${node.getTextContent()}](${node.getURL()})`
		const firstChild = node.getFirstChild()
		// Add text styles only if link has single text node inside. If it's more
		// then one we ignore it as markdown does not support nested styles for links
		if (node.getChildrenSize() === 1 && $isTextNode(firstChild)) {
			return exportFormat(firstChild, linkContent)
		} else {
			return linkContent
		}
	},
	importRegExp: /(?:\[([^[]+)\])(?:\((?:([^()\s]+)(?:\s"((?:[^"]*\\")*[^"]*)"\s*)?)\))/,
	regExp: /(?:\[([^[]+)\])(?:\((?:([^()\s]+)(?:\s"((?:[^"]*\\")*[^"]*)"\s*)?)\))$/,
	replace: (textNode, match) => {
		const [, linkText, linkUrl, linkTitle] = match
		const linkNode = $createLinkNode(linkUrl, { title: linkTitle })
		const linkTextNode = $createTextNode(linkText)
		linkTextNode.setFormat(textNode.getFormat())
		linkNode.append(linkTextNode)
		textNode.replace(linkNode)
	},
	trigger: ')',
	type: 'text-match'
}
