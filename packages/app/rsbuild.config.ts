import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSvgr } from '@rsbuild/plugin-svgr'

import type { RsbuildConfig } from '@rsbuild/core'

const is_dev = process.env.NODE_ENV === 'development'
const is_prod = process.env.NODE_ENV === 'production'

const postcss_plugins = ['postcss-import', 'postcss-nested', 'postcss-calc']

export default {
	source: { entry: { index: './runtime/index.tsx' }, decorators: { version: 'legacy' } },
	output: { legalComments: 'none' },
	html: { title: 'Animus - Grow with AI', template: './public/index.html' },
	plugins: [pluginReact(), pluginSvgr()],
	performance: { removeConsole: is_prod },
	server: { open: false, port: 666, cors: { origin: ['http://localhost:8787'] } },
	tools: {
		lightningcssLoader: { targets: 'chrome >= 120', exclude: { isSelector: true } },
		postcss: { postcssOptions: { config: false, plugins: postcss_plugins.map(item => require(item)) } },
		swc: { jsc: { experimental: { plugins: [['swc-plugin-jsx-control-statements', {}]] } } }
	}
} as RsbuildConfig
