import { notarize } from '@desktop/notarize'

import type { AfterPackContext } from 'electron-builder'

export default (context: AfterPackContext) => {
	const { electronPlatformName, appOutDir } = context

	if (electronPlatformName !== 'darwin') return

	const appName = context.packager.appInfo.productFilename

	console.log(appName, ' is notarizing...')

	return notarize({
		teamId: '84LQHT5G2Z',
		appPath: `${appOutDir}/${appName}.app`,
		appleId: 'xiewendao123@foxmail.com',
		appleIdPassword: 'txbv-szcs-glqi-kvka'
	})
}
