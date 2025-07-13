import { join } from 'path'
import { app } from 'electron'

import { conf } from '@desktop/utils'

import { productName } from '../../package.json'

export const app_data_path = join(app.getPath('documents'), `/.${productName}`)
export const user_data_path = join(app_data_path, `/${conf.get('workspace') || 'default'}`)
