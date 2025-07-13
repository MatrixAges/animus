import { Conf } from 'electron-conf/main'

import { app_data_path } from '@desktop/utils'

export default new Conf({ dir: app_data_path, name: 'appdata' })
