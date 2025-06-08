import { p, relaunch } from '@electron/utils'

export default p.query(async () => {
	relaunch()
})
