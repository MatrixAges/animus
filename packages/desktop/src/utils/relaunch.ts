import { app } from 'electron'

import { is_mas } from '@desktop/utils'

export default () => {
	if (!is_mas) app.relaunch()

	app.exit()
}
