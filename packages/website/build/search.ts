import { Document } from 'flexsearch'
import { readFileSync, writeFileSync } from 'fs'
import { compressToUTF16 } from 'lz-string'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { nanoid } from 'nanoid'
import { globSync } from 'tinyglobby'

import type { RootContent } from 'mdast'

const docs_dir = `${process.cwd()}/public/docs`
const search_dir = `${process.cwd()}/public/search`
const mds_en = globSync(['**/en.md'], { cwd: docs_dir })
const mds_zh_cn = globSync(['**/zh-cn.md'], { cwd: docs_dir })

const mds = [
	{
		locale: 'en',
		docs: mds_en
	},
	{
		locale: 'zh-cn',
		docs: mds_zh_cn
	}
]

interface IndexItem {
	id: string
	link: string
	type: 'heading' | 'content'
	headings: string
	content: string
}

const getText = (item: RootContent) => {
	if ('children' in item) {
		return item.children.reduce((total, item) => {
			if ('children' in item) {
				total += getText(item)
			} else {
				if ('value' in item) {
					total += item.value
				}
			}

			return total
		}, '')
	} else {
		if ('value' in item) {
			return item.value
		}
	}

	return ''
}

const common_options = {
	cache: 100,
	tokenize: 'full',
	document: {
		id: 'id',
		index: 'content',
		store: true
	},
	context: {
		resolution: 9,
		depth: 3,
		bidirectional: true
	}
} as const

mds.forEach(async mds_item => {
	const indexes = new Document(common_options)

	mds_item.docs.forEach(async item => {
		const link = item.replace(`/${mds_item.locale}.mdx`, '')
		const doc = readFileSync(`${docs_dir}/${item}`)
		const ast = fromMarkdown(doc)
		const items = ast.children

		let headings = [] as Array<{ title: string; level: number }>

		items.forEach(item => {
			const prev_heading = headings.at(-1)

			if (item.type === 'heading') {
				if (prev_heading) {
					if (prev_heading.level < item.depth) {
						headings.push({ title: getText(item), level: item.depth })
					} else if (prev_heading.level === item.depth) {
						headings.pop()

						headings.push({ title: getText(item), level: item.depth })
					} else if (prev_heading.level > item.depth) {
						while (headings.at(-1)!.level > item.depth) {
							headings.pop()
						}

						if (headings.at(-1)!.level === item.depth) {
							headings.pop()

							headings.push({ title: getText(item), level: item.depth })
						} else {
							headings.push({ title: getText(item), level: item.depth })
						}
					}
				} else {
					headings.push({ title: getText(item), level: item.depth })
				}

				indexes.add({
					id: nanoid(6),
					link,
					type: 'heading',
					headings: headings.map(item => item.title).join('>'),
					content: getText(item)
				})
			} else {
				let content: string = getText(item)

				if (content) {
					content.split('\n').forEach(c => {
						if (c) {
							indexes.add({
								id: nanoid(6),
								link,
								type: 'content',
								headings: headings.map(item => item.title).join('>'),
								content: c
							})
						}
					})
				}
			}
		})
	})

	const export_index = {} as Record<string, any>

	await indexes.export((id, value) => {
		if (value) {
			export_index[id] = value
		}
	})

	writeFileSync(`${search_dir}/${mds_item.locale}`, compressToUTF16(JSON.stringify(export_index)))
	writeFileSync(`${search_dir}/timestamp`, new Date().valueOf().toString())
})
