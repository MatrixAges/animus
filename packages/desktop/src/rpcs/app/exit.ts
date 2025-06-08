import { app } from 'electron'

import { p } from '@electron/utils'

export default p.query(async () => {
	app.exit()
})
