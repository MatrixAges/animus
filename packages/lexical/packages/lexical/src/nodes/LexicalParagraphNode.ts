import type { EditorConfig, KlassConstructor, LexicalEditor, Spread } from '../LexicalEditor'
import type { DOMConversionMap, DOMConversionOutput, DOMExportOutput, LexicalNode, NodeKey } from '../LexicalNode'
import type { ElementFormatType, SerializedElementNode } from './LexicalElementNode'
import type { RangeSelection } from 'lexical'

import { TEXT_TYPE_TO_FORMAT } from '../LexicalConstants'
import {
	$applyNodeReplacement,
	$setImportNode,
	getCachedClassNameArray,
	isHTMLElement,
	setNodeIndentFromDOM,
	toggleTextFormatType
} from '../LexicalUtils'
import { ElementNode } from './LexicalElementNode'
import { $isTextNode, TextFormatType } from './LexicalTextNode'

export type SerializedParagraphNode = Spread<
	{
		textFormat: number
		key: string
	},
	SerializedElementNode
>

/** @noInheritDoc */
export class ParagraphNode extends ElementNode {
	['constructor']!: KlassConstructor<typeof ParagraphNode>
	/** @internal */
	__textFormat: number

	constructor(key?: NodeKey) {
		super(key)
		this.__textFormat = 0
	}

	static getType(): string {
		return 'paragraph'
	}

	getTextFormat(): number {
		const self = this.getLatest()
		return self.__textFormat
	}

	setTextFormat(type: number): this {
		const self = this.getWritable()
		self.__textFormat = type
		return self
	}

	hasTextFormat(type: TextFormatType): boolean {
		const formatFlag = TEXT_TYPE_TO_FORMAT[type]
		return (this.getTextFormat() & formatFlag) !== 0
	}

	getFormatFlags(type: TextFormatType, alignWithFormat: null | number): number {
		const self = this.getLatest()
		const format = self.__textFormat
		return toggleTextFormatType(format, type, alignWithFormat)
	}

	static clone(node: ParagraphNode, new_key?: boolean): ParagraphNode {
		return new ParagraphNode(new_key ? undefined : node.__key)
	}

	createDOM(config: EditorConfig): HTMLElement {
		const dom = document.createElement('p')
		const classNames = getCachedClassNameArray(config.theme, 'paragraph')
		if (classNames !== undefined) {
			const domClassList = dom.classList
			domClassList.add(...classNames)
		}
		return dom
	}
	updateDOM(prevNode: ParagraphNode, dom: HTMLElement, config: EditorConfig): boolean {
		return false
	}

	static importDOM(): DOMConversionMap | null {
		return {
			p: (node: Node) => ({
				conversion: $convertParagraphElement,
				priority: 0
			})
		}
	}

	exportDOM(editor: LexicalEditor): DOMExportOutput {
		const { element } = super.exportDOM(editor)

		if (element && isHTMLElement(element)) {
			if (this.isEmpty()) {
				element.append(document.createElement('br'))
			}

			const formatType = this.getFormatType()
			element.style.textAlign = formatType

			const direction = this.getDirection()

			if (direction) {
				element.dir = direction
			}
		}

		return {
			element
		}
	}

	static importJSON(serializedNode: SerializedParagraphNode, update?: boolean): ParagraphNode {
		const node = $createParagraphNode(serializedNode.key)

		if (!update) $setImportNode(serializedNode.key, node)

		node.setFormat(serializedNode.format)
		node.setIndent(serializedNode.indent)
		node.setDirection(serializedNode.direction)
		node.setTextFormat(serializedNode.textFormat)
		return node
	}

	exportJSON(): SerializedParagraphNode {
		return {
			...super.exportJSON(),
			textFormat: this.getTextFormat(),
			type: 'paragraph',
			version: 1
		}
	}

	// Mutation

	insertNewAfter(rangeSelection: RangeSelection, restoreSelection: boolean): ParagraphNode {
		const newElement = $createParagraphNode()
		newElement.setTextFormat(rangeSelection.format)
		const direction = this.getDirection()
		newElement.setDirection(direction)
		newElement.setFormat(this.getFormatType())
		this.insertAfter(newElement, restoreSelection)
		return newElement
	}

	collapseAtStart(): boolean {
		const children = this.getChildren()
		// If we have an empty (trimmed) first paragraph and try and remove it,
		// delete the paragraph as long as we have another sibling to go to
		if (children.length === 0 || ($isTextNode(children[0]) && children[0].getTextContent().trim() === '')) {
			const nextSibling = this.getNextSibling()
			if (nextSibling !== null) {
				this.selectNext()
				this.remove()
				return true
			}
			const prevSibling = this.getPreviousSibling()
			if (prevSibling !== null) {
				this.selectPrevious()
				this.remove()
				return true
			}
		}
		return false
	}
}

function $convertParagraphElement(element: HTMLElement): DOMConversionOutput {
	const node = $createParagraphNode()
	if (element.style) {
		node.setFormat(element.style.textAlign as ElementFormatType)

		setNodeIndentFromDOM(element, node)
	}
	return { node }
}

export function $createParagraphNode(key?: string): ParagraphNode {
	return $applyNodeReplacement(new ParagraphNode(key))
}

export function $isParagraphNode(node: LexicalNode | null | undefined): node is ParagraphNode {
	return node instanceof ParagraphNode
}
