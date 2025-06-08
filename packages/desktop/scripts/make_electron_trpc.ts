import { copySync } from 'fs-extra'

const source_path = `${process.cwd()}/polyfills/electron-trpc/main.mjs`
const target_path = `${process.cwd()}/node_modules/electron-trpc/dist/main.mjs`

copySync(source_path, target_path)
