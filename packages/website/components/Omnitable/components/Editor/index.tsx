import 'highlight.js/styles/atom-one-dark.min.css'

import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { createLowlight } from 'lowlight'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { $ } from '@website/utils'

import styles from './index.module.css'
import Toolbar from './Toolbar'

const lowlight = createLowlight()

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

const Index = () => {
	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			Placeholder.configure({ placeholder: 'Write description...' }),
			StarterKit.configure({
				codeBlock: false
			}),
			Typography,
			Link.configure({
				openOnClick: false,
				defaultProtocol: 'https'
			}),
			Image,
			Table.configure({
				resizable: true
			}),
			TableHeader,
			TableRow,
			TableCell,
			TaskList,
			TaskItem.configure({
				nested: true
			}),
			CodeBlockLowlight.configure({
				lowlight,
				defaultLanguage: 'ts'
			}),
			Highlight.configure({ multicolor: true }),
			TextStyle,
			Color
		],
		content: `
            <p>Hello World! 🌎️</p>
            <p>And this is highlighted too, but in a different color.</p>
            <p>And this one has a data attribute.</p>
            `
	})

	if (!editor) return null

	return (
		<div className={$.cx('flex flex_column', styles._local)}>
			<Toolbar editor={editor}></Toolbar>
			<EditorContent editor={editor} />
		</div>
	)
}

export default $.memo(Index)
