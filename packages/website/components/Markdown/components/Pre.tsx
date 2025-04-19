import { $ } from '@website/utils'

import Code from './Code'
import Mermaid from './Mermaid'

import type { HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'
import type { Element, Text } from 'hast'
import type { BundledLanguage } from 'shiki/bundle/web'

const Index = (props: HTMLAttributes<HTMLPreElement> & ExtraProps) => {
	const { node } = props

	const code_node = node!.children[0] as Element
	const class_names = code_node.properties.className as Array<string>
	const language = class_names[0].replace('language-', '')
	const text_node = code_node.children[0] as Text
	const content = text_node.value

	if (language === 'mermaid') {
		return <Mermaid>{content}</Mermaid>
	}

	return <Code language={language as BundledLanguage}>{content}</Code>
}

export default $.memo(Index)
