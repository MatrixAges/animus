import './_esm_'

import { exec } from 'child-process-promise'
import fs from 'fs-extra'
import { resolve } from 'path'

import { modules, split_modules } from './build.utils'

const { copySync, removeSync } = fs

await exec('tsc -p ./tsconfig.build.json')

modules.concat(split_modules).forEach(name => {
	copySync(`./.ts-temp/${name}/src`, resolve(__dirname, `./packages/${name}/dist`))
})

removeSync(`./.ts-temp`)
