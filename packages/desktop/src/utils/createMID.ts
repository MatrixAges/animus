import machineId from 'node-machine-uid'

import { conf } from './conf'

conf.set('mid', machineId(true))
