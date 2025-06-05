'use client'

import 'katex/dist/katex.min.css'

import Markdown from 'react-markdown'
import callouts from 'rehype-callouts'
import slug from 'rehype-slug'
import breaks from 'remark-breaks'
import frontmatter from 'remark-frontmatter'
import gfm from 'remark-gfm'
import images from 'remark-images'
import math from 'remark-math'

import figure from '@microflash/rehype-figure'
import md_styles from '@website/styles/markdown.module.css'
import { $ } from '@website/utils'

import components from './components'

import styles from './index.module.css'

interface IProps {
	md: string
}

const Index = (props: IProps) => {
	const { md } = props

	return (
		<article className={$.cx(styles._local, md_styles.md, md_styles.callout, md_styles.serif)}>
			<Markdown
				remarkPlugins={[gfm, breaks, math, frontmatter, images]}
				rehypePlugins={[slug, figure, [callouts, { theme: 'vitepress' }]]}
				components={components}
			>
				{md}
			</Markdown>
		</article>
	)
}

export default $.memo(Index)
