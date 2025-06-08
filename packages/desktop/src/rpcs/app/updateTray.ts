import { app, nativeImage } from 'electron'
import { object, string } from 'zod'

import { p } from '@electron/utils'

import config from '../../../config'

const input_type = object({
	data_url: string(),
	title: string()
}).optional()

export default p.input(input_type).query(async ({ input, ctx }) => {
	const tray = ctx.tray

	if (input) {
		const { data_url, title } = input
		const image = nativeImage.createFromDataURL(data_url)

		tray.setImage(image)
		tray.setTitle(title)
		tray.setToolTip(title)
	} else {
		tray.setImage(config.getTrayIcon())
		tray.setTitle('')
		tray.setToolTip(app.name)
	}
})
