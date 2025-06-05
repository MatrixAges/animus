import { resolve } from 'path'
import { copySync, removeSync } from 'fs-extra'

removeSync('../if_electron/app_dist')
copySync(resolve('dist'), resolve('../if_electron/app_dist'))
