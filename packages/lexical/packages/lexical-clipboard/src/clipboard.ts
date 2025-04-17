import {
	$createParagraphNode,
	$createTextNode,
	$getEditor,
	$getRoot,
	$getSelection,
	$isElementNode,
	$isRangeSelection,
	$isTextNode,
	$parseSerializedNode,
	id,
	isSelectionWithinEditor,
	BaseSelection,
	BaseSerializedNode,
	COMMAND_PRIORITY_CRITICAL,
	COPY_COMMAND,
	LexicalEditor,
	LexicalNode,
	SerializedElementNode,
	SerializedTextNode,
	SELECTION_INSERT_CLIPBOARD_NODES_COMMAND
} from 'lexical'
import { CAN_USE_DOM } from 'shared/canUseDOM'
import invariant from 'shared/invariant'

import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { $isListNode } from '@lexical/list'
import { $isHeadingNode } from '@lexical/rich-text'
import { $addNodeStyle, $cloneWithProperties, $sliceSelectedTextNodeContent } from '@lexical/selection'
import { $findMatchingParent, $isSelectionInCode, objectKlassEquals } from '@lexical/utils'

export interface LexicalClipboardData {
	'text/html'?: string | undefined
	'application/x-lexical-editor'?: string | undefined
	'text/plain': string
}

const getDOMSelection = (targetWindow: Window | null): Selection | null =>
	CAN_USE_DOM ? (targetWindow || window).getSelection() : null

const clipboardDataFunctions = [
	['text/html', $getHtmlContent],
	['application/x-lexical-editor', $getLexicalContent]
] as const

/**
 * Returns the *currently selected* Lexical content as an HTML string, relying on the
 * logic defined in the exportDOM methods on the LexicalNode classes. Note that
 * this will not return the HTML content of the entire editor (unless all the content is included
 * in the current selection).
 *
 * @param editor - LexicalEditor instance to get HTML content from
 * @returns a string of HTML content
 */
export function $getHtmlContent(editor: LexicalEditor, selection = $getSelection()): string {
	if (selection == null) {
		invariant(false, 'Expected valid LexicalSelection')
	}

	// If we haven't selected anything
	if (($isRangeSelection(selection) && selection.isCollapsed()) || selection.getNodes().length === 0) {
		return ''
	}

	return $generateHtmlFromNodes(editor, selection)
}

/**
 * Returns the *currently selected* Lexical content as a JSON string, relying on the
 * logic defined in the exportJSON methods on the LexicalNode classes. Note that
 * this will not return the JSON content of the entire editor (unless all the content is included
 * in the current selection).
 *
 * @param editor  - LexicalEditor instance to get the JSON content from
 * @returns
 */
export function $getLexicalContent(editor: LexicalEditor, selection = $getSelection()): null | string {
	if (selection == null) {
		invariant(false, 'Expected valid LexicalSelection')
	}

	// If we haven't selected anything
	if (($isRangeSelection(selection) && selection.isCollapsed()) || selection.getNodes().length === 0) {
		return null
	}

	return JSON.stringify($generateJSONFromSelectedNodes(editor, selection))
}

/**
 * Attempts to insert content of the mime-types text/plain or text/uri-list from
 * the provided DataTransfer object into the editor at the provided selection.
 * text/uri-list is only used if text/plain is not also provided.
 *
 * @param dataTransfer an object conforming to the [DataTransfer interface] (https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface)
 * @param selection the selection to use as the insertion point for the content in the DataTransfer object
 */
export function $insertDataTransferForPlainText(dataTransfer: DataTransfer, selection: BaseSelection): void {
	const text = dataTransfer.getData('text/plain') || dataTransfer.getData('text/uri-list')

	if (text != null) {
		selection.insertRawText(text)
	}
}

function getTextModeNodes(nodes: Array<LexicalNode>) {
	return nodes.map(node => {
		if ($isListNode(node) || $isHeadingNode(node)) {
			const p = $createParagraphNode()
			const text = $createTextNode(node.getTextContent())

			return p.append(text)
		}

		return node
	})
}

/**
 * Attempts to insert content of the mime-types application/x-lexical-editor, text/html,
 * text/plain, or text/uri-list (in descending order of priority) from the provided DataTransfer
 * object into the editor at the provided selection.
 *
 * @param dataTransfer an object conforming to the [DataTransfer interface] (https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface)
 * @param selection the selection to use as the insertion point for the content in the DataTransfer object
 * @param editor the LexicalEditor the content is being inserted into.
 */
export function $insertDataTransferForRichText(
	dataTransfer: DataTransfer,
	selection: BaseSelection,
	editor: LexicalEditor
): void {
	const lexicalString = dataTransfer.getData('application/x-lexical-editor')

	if (lexicalString) {
		try {
			const payload = JSON.parse(lexicalString)
			if (payload.namespace === editor._config.namespace && Array.isArray(payload.nodes)) {
				let nodes = $generateNodesFromSerializedNodes(payload.nodes)

				if (editor.refs.text_mode) nodes = getTextModeNodes(nodes)

				return $insertGeneratedNodes(editor, nodes, selection)
			}
		} catch {
			// Fail silently.
		}
	}

	const htmlString = dataTransfer.getData('text/html')
	const is_vscode = dataTransfer.getData('vscode-editor-data')

	if (htmlString && !is_vscode) {
		try {
			let nodes: Array<LexicalNode>

			if (editor.refs.convertFromString) {
				const plainText = dataTransfer.getData('text/plain')

				nodes = editor.refs.convertFromString(plainText)
			} else {
				const parser = new DOMParser()
				const dom = parser.parseFromString(htmlString, 'text/html')

				nodes = $generateNodesFromDOM(editor, dom)
			}

			if (editor.refs.text_mode) nodes = getTextModeNodes(nodes)

			return $insertGeneratedNodes(editor, nodes, selection)
		} catch {
			// Fail silently.
		}
	}

	// Multi-line plain text in rich text mode pasted as separate paragraphs
	// instead of single paragraph with linebreaks.
	// Webkit-specific: Supports read 'text/uri-list' in clipboard.
	const text = dataTransfer.getData('text/plain') || dataTransfer.getData('text/uri-list')

	if (text != null) {
		if ($isRangeSelection(selection)) {
			if ($isSelectionInCode(selection)) {
				const anchor_node = selection.anchor.getNode()
				const code = $findMatchingParent(anchor_node, n => n.__type === 'code')

				// @ts-ignore
				if (code) selection.insertRawText(text)
			} else {
				const nodes = editor.refs.getNodesFromText(text)

				selection.insertNodes(nodes)
			}
		} else {
			selection.insertRawText(text)
		}
	}
}

/**
 * Inserts Lexical nodes into the editor using different strategies depending on
 * some simple selection-based heuristics. If you're looking for a generic way to
 * to insert nodes into the editor at a specific selection point, you probably want
 * {@link lexical.$insertNodes}
 *
 * @param editor LexicalEditor instance to insert the nodes into.
 * @param nodes The nodes to insert.
 * @param selection The selection to insert the nodes into.
 */
export function $insertGeneratedNodes(
	editor: LexicalEditor,
	nodes: Array<LexicalNode>,
	selection: BaseSelection
): void {
	if (
		!editor.dispatchCommand(SELECTION_INSERT_CLIPBOARD_NODES_COMMAND, {
			nodes,
			selection
		})
	) {
		selection.insertNodes(nodes)
	}
	return
}

function exportNodeToJSON<T extends LexicalNode>(node: T): BaseSerializedNode {
	const serializedNode = node.exportJSON()
	const nodeClass = node.constructor

	if (serializedNode.type !== nodeClass.getType()) {
		invariant(false, 'LexicalNode: Node %s does not implement .exportJSON().', nodeClass.name)
	}

	if ($isElementNode(node)) {
		const serializedChildren = (serializedNode as SerializedElementNode).children
		if (!Array.isArray(serializedChildren)) {
			invariant(
				false,
				'LexicalNode: Node %s is an element but .exportJSON() does not have a children array.',
				nodeClass.name
			)
		}
	}

	return serializedNode
}

function $appendNodesToJSON(
	editor: LexicalEditor,
	selection: BaseSelection | null,
	currentNode: LexicalNode,
	targetArray: Array<BaseSerializedNode> = []
): boolean {
	let shouldInclude = selection !== null ? currentNode.isSelected(selection) : true
	const shouldExclude = $isElementNode(currentNode) && currentNode.excludeFromCopy('html')
	let target = currentNode

	if (selection !== null) {
		let clone = $cloneWithProperties<LexicalNode>(currentNode)

		clone = $cloneWithProperties(
			$isTextNode(clone) && selection !== null ? $sliceSelectedTextNodeContent(selection, clone) : clone,
			false
		)

		target = clone
	}

	const children = $isElementNode(target) ? target.getChildren() : []

	const serializedNode = exportNodeToJSON(target)

	// TODO: TextNode calls getTextContent() (NOT node.__text) within it's exportJSON method
	// which uses getLatest() to get the text from the original node with the same key.
	// This is a deeper issue with the word "clone" here, it's still a reference to the
	// same node as far as the LexicalEditor is concerned since it shares a key.
	// We need a way to create a clone of a Node in memory with it's own key, but
	// until then this hack will work for the selected text extract use case.
	if ($isTextNode(target)) {
		const text = target.__text
		// If an uncollapsed selection ends or starts at the end of a line of specialized,
		// TextNodes, such as code tokens, we will get a 'blank' TextNode here, i.e., one
		// with text of length 0. We don't want this, it makes a confusing mess. Reset!
		if (text.length > 0) {
			;(serializedNode as SerializedTextNode).text = text
		} else {
			shouldInclude = false
		}
	}

	for (let i = 0; i < children.length; i++) {
		const childNode = children[i]
		const shouldIncludeChild = $appendNodesToJSON(editor, selection, childNode, serializedNode.children)

		if (
			!shouldInclude &&
			$isElementNode(currentNode) &&
			shouldIncludeChild &&
			currentNode.extractWithChild(childNode, selection, 'clone')
		) {
			shouldInclude = true
		}
	}

	if (shouldInclude && !shouldExclude) {
		targetArray.push(serializedNode)
	} else if (Array.isArray(serializedNode.children)) {
		for (let i = 0; i < serializedNode.children.length; i++) {
			const serializedChildNode = serializedNode.children[i]
			targetArray.push(serializedChildNode)
		}
	}

	return shouldInclude
}

// TODO why $ function with Editor instance?
/**
 * Gets the Lexical JSON of the nodes inside the provided Selection.
 *
 * @param editor LexicalEditor to get the JSON content from.
 * @param selection Selection to get the JSON content from.
 * @returns an object with the editor namespace and a list of serializable nodes as JavaScript objects.
 */
export function $generateJSONFromSelectedNodes<SerializedNode extends BaseSerializedNode>(
	editor: LexicalEditor,
	selection: BaseSelection | null
): {
	namespace: string
	nodes: Array<SerializedNode>
} {
	const nodes: Array<SerializedNode> = []
	const root = $getRoot()
	const topLevelChildren = root.getChildren()
	for (let i = 0; i < topLevelChildren.length; i++) {
		const topLevelNode = topLevelChildren[i]
		$appendNodesToJSON(editor, selection, topLevelNode, nodes)
	}
	return {
		namespace: editor._config.namespace,
		nodes
	}
}

const changeSerializedNodesId = (serializedNodes: Array<BaseSerializedNode>) => {
	serializedNodes.forEach(item => {
		item.key = id()

		if (item.children) {
			item.children = changeSerializedNodesId(item.children)
		}
	})

	return serializedNodes
}

/**
 * This method takes an array of objects conforming to the BaseSeralizedNode interface and returns
 * an Array containing instances of the corresponding LexicalNode classes registered on the editor.
 * Normally, you'd get an Array of BaseSerialized nodes from {@link $generateJSONFromSelectedNodes}
 *
 * @param serializedNodes an Array of objects conforming to the BaseSerializedNode interface.
 * @returns an Array of Lexical Node objects.
 */
export function $generateNodesFromSerializedNodes(serializedNodes: Array<BaseSerializedNode>): Array<LexicalNode> {
	const nodes = []

	changeSerializedNodesId(serializedNodes)

	for (let i = 0; i < serializedNodes.length; i++) {
		const serializedNode = serializedNodes[i]

		const node = $parseSerializedNode(serializedNode)

		if ($isTextNode(node)) {
			$addNodeStyle(node)
		}

		nodes.push(node)
	}

	return nodes
}

const EVENT_LATENCY = 50
let clipboardEventTimeout: null | number = null

// TODO custom selection
// TODO potentially have a node customizable version for plain text
/**
 * Copies the content of the current selection to the clipboard in
 * text/plain, text/html, and application/x-lexical-editor (Lexical JSON)
 * formats.
 *
 * @param editor the LexicalEditor instance to copy content from
 * @param event the native browser ClipboardEvent to add the content to.
 * @returns
 */
export async function copyToClipboard(
	editor: LexicalEditor,
	event: null | ClipboardEvent,
	data?: LexicalClipboardData
): Promise<boolean> {
	if (clipboardEventTimeout !== null) {
		// Prevent weird race conditions that can happen when this function is run multiple times
		// synchronously. In the future, we can do better, we can cancel/override the previously running job.
		return false
	}
	if (event !== null) {
		return new Promise((resolve, reject) => {
			editor.update(() => {
				resolve($copyToClipboardEvent(editor, event, data))
			})
		})
	}

	const rootElement = editor.getRootElement()
	const windowDocument = editor._window == null ? window.document : editor._window.document
	const domSelection = getDOMSelection(editor._window)
	if (rootElement === null || domSelection === null) {
		return false
	}
	const element = windowDocument.createElement('span')
	element.style.cssText = 'position: fixed; top: -1000px;'
	element.append(windowDocument.createTextNode('#'))
	rootElement.append(element)
	const range = new Range()
	range.setStart(element, 0)
	range.setEnd(element, 1)
	domSelection.removeAllRanges()
	domSelection.addRange(range)

	return new Promise((resolve, reject) => {
		const removeListener = editor.registerCommand(
			COPY_COMMAND,
			secondEvent => {
				if (objectKlassEquals(secondEvent, ClipboardEvent)) {
					removeListener()
					if (clipboardEventTimeout !== null) {
						window.clearTimeout(clipboardEventTimeout)
						clipboardEventTimeout = null
					}
					resolve($copyToClipboardEvent(editor, secondEvent as ClipboardEvent))
				}
				// Block the entire copy flow while we wait for the next ClipboardEvent
				return true
			},
			COMMAND_PRIORITY_CRITICAL
		)
		// If the above hack execCommand hack works, this timeout code should never fire. Otherwise,
		// the listener will be quickly freed so that the user can reuse it again
		clipboardEventTimeout = window.setTimeout(() => {
			removeListener()
			clipboardEventTimeout = null
			resolve(false)
		}, EVENT_LATENCY)
		windowDocument.execCommand('copy')
		element.remove()
	})
}

/**
 * Serialize the content of the current selection to strings in
 * text/plain, text/html, and application/x-lexical-editor (Lexical JSON)
 * formats (as available).
 *
 * @param selection the selection to serialize (defaults to $getSelection())
 * @returns LexicalClipboardData
 */
export function $getClipboardDataFromSelection(
	selection: BaseSelection | null = $getSelection()
): LexicalClipboardData {
	const clipboardData: LexicalClipboardData = {
		'text/plain': selection ? selection.getTextContent() : ''
	}
	if (selection) {
		const editor = $getEditor()

		for (const [mimeType, $editorFn] of clipboardDataFunctions) {
			const v = $editorFn(editor, selection)

			if (v !== null) {
				clipboardData[mimeType] = v
			}
		}
	}
	return clipboardData
}

/**
 * Call setData on the given clipboardData for each MIME type present
 * in the given data (from {@link $getClipboardDataFromSelection})
 *
 * @param clipboardData the event.clipboardData to populate from data
 * @param data The lexical data
 */
export function setLexicalClipboardDataTransfer(clipboardData: DataTransfer, data: LexicalClipboardData) {
	for (const k in data) {
		const v = data[k as keyof LexicalClipboardData]

		if (v !== undefined) {
			clipboardData.setData(k, v)
		}
	}
}

// TODO shouldn't pass editor (pass namespace directly)
function $copyToClipboardEvent(editor: LexicalEditor, event: ClipboardEvent, data?: LexicalClipboardData): boolean {
	if (data === undefined) {
		const domSelection = getDOMSelection(editor._window)

		if (!domSelection) {
			return false
		}

		const anchorDOM = domSelection.anchorNode
		const focusDOM = domSelection.focusNode

		if (anchorDOM !== null && focusDOM !== null && !isSelectionWithinEditor(editor, anchorDOM, focusDOM)) {
			return false
		}

		const selection = $getSelection()

		if (selection === null) {
			return false
		}

		data = $getClipboardDataFromSelection(selection)
	}

	event.preventDefault()

	const clipboardData = event.clipboardData

	if (clipboardData === null) {
		return false
	}

	setLexicalClipboardDataTransfer(clipboardData, data)

	return true
}
