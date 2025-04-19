import to from 'await-to-js'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter'
import { toc as genToc } from 'mdast-util-toc'
import { frontmatter } from 'micromark-extension-frontmatter'
import { parse } from 'yaml'

import { getUserLocale } from '@website/services'
import { getHeadings, getToc } from '@website/utils'
import { getPublic } from '@website/utils/ofetch'

export default async (type: 'blog', id: string, with_toc?: boolean) => {
	const { locale } = await getUserLocale()
	const [err, md] = await to(getPublic(`/${type}/${id}/${locale}.md`, { parseResponse: txt => txt }))

	if (err) return { err }

	if (with_toc) {
		const ast = fromMarkdown(md, {
			extensions: [frontmatter(['yaml'])],
			mdastExtensions: [frontmatterFromMarkdown(['yaml'])]
		})

		let fm = null

		const map = getHeadings(ast)
		const toc_list = genToc(ast, { ordered: true })

		let toc = getToc(map, toc_list.map?.children!)

		if (ast.children?.[0]?.type == 'yaml') {
			fm = parse(ast.children[0].value)
		}

		if (toc?.length === 1) {
			const first = toc[0] as any

			if (first.level === 1 && first.children?.length) {
				toc = first.children
			}
		}

		return { md, toc, fm }
	}

	return md
}
