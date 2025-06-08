import { router } from '@electron/utils'

import onVerify from './onVerify'
import savePaidInfo from './savePaidInfo'

export default router({
	onVerify,
	savePaidInfo
})
