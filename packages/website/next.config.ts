import createNextIntlPlugin from 'next-intl/plugin'

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

import type { NextConfig } from 'next'

const withIntl = createNextIntlPlugin('./i18n.ts')

const is_dev = process.env.NODE_ENV === 'development'

const config: NextConfig = {
	devIndicators: false,
	reactStrictMode: false,
	transpilePackages: ['stk', 'shiki'],
	pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
	typescript: { ignoreBuildErrors: true },
	webpack(config) {
		const svg_rule = config.module.rules.find((rule: any) => {
			return rule.test && new RegExp(rule.test).test('.svg')
		})

		svg_rule.exclude = /\.inline\.svg$|\.svg\?inline/

		config.module.rules.push(
			{
				test: /\.inline\.svg$/,
				use: [{ loader: '@svgr/webpack', options: { icon: true } }]
			},
			{
				test: /\.svg$/,
				resourceQuery: /inline/,
				use: [{ loader: '@svgr/webpack', options: { icon: true } }]
			}
		)

		return config
	}
}

// don't use rspack for production
// export default is_dev ? withRspack(withIntl(config)) : withIntl(config)
export default withIntl(config)

initOpenNextCloudflareForDev()
