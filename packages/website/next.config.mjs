import createNextIntlPlugin from 'next-intl/plugin'
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

const withIntl = createNextIntlPlugin('./i18n.ts')

if (process.env.NODE_ENV === 'development') {
	await setupDevPlatform()
}

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: false,
	transpilePackages: ['@openages/stk', 'shiki'],
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'if-files.openages.com'
			}
		],
		minimumCacheTTL: 60 * 60
	},
	typescript: { ignoreBuildErrors: true },
	webpack(config) {
		const svg_rule = config.module.rules.find(rule => {
			return rule.test && new RegExp(rule.test).test('.svg')
		})

		svg_rule.exclude = /\.inline\.svg$/

		config.module.rules.push({
			test: /\.inline\.svg$/,
			use: [{ loader: '@svgr/webpack', options: { icon: true } }]
		})

		return config
	},
	experimental: {
		mdxRs: true,
		turbo: {
			useSwcCss: true,
			rules: {
				'*.inline.svg': {
					loaders: [{ loader: '@svgr/webpack', options: { icon: true } }],
					as: '*.js'
				}
			}
		}
	}
}

export default withIntl(config)
