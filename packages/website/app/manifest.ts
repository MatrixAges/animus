import { description, name } from '@website/appdata'

import type { MetadataRoute } from 'next'

export default () => {
	return {
		name: `${name} Website`,
		short_name: name,
		description,
		start_url: '/',
		display: 'standalone',
		background_color: '#fff',
		theme_color: '#000',
		icons: [
			{
				src: '/logo_dock.svg',
				type: 'image/svg+xml',
				sizes: 'any'
			}
		]
	} as MetadataRoute.Manifest
}
