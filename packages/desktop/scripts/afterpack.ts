import { removeSync } from 'fs-extra'
import { globSync } from 'tinyglobby'

import type { AfterPackContext } from 'electron-builder'

const excludes = ['en', 'zh_CN']

const getLocalePath = (appOutDir: string, name: string) => {
	return `${appOutDir}/IF.app/Contents/Frameworks/Electron Framework.framework/Versions/A/Resources/${name}/locale.pak`
}

const getExcludesPath = (appOutDir: string) => excludes.map(item => `${getLocalePath(appOutDir, `${item}.lproj`)}`)

export default (context: AfterPackContext) => {
	const { appOutDir } = context
	const locale_dir = getLocalePath(appOutDir, '**')

	globSync([locale_dir], { ignore: getExcludesPath(appOutDir) }).forEach(item => {
		removeSync(item.replace('/locale.pak', ''))
	})
}
