import { Conf } from 'electron-conf/main'

const conf = new Conf()

conf.registerRendererListener()

export { conf }
