import { execSync } from 'child_process'
import { removeSync } from 'fs-extra'
import { resolve } from 'path'

import { devDependencies } from '../package.json'

const electron_dir = `${process.cwd()}/node_modules/electron`
const electron_root = resolve(process.cwd(), `../../node_modules/.pnpm/electron@${devDependencies.electron}`)
const electron_plist = `${electron_dir}/dist/Electron.app/Contents/Info.plist`

removeSync(electron_dir)
removeSync(electron_root)

execSync('pnpm install')
execSync(`plutil -replace CFBundleIdentifier -string com.openages.if ${electron_plist}`)
execSync(`plutil -insert ElectronTeamID -string 84LQHT5G2Z ${electron_plist}`)
