import { Conf } from 'electron-conf/renderer'

import { is_electron } from './is'

const conf = new Conf<any>()

export default conf

export const set_store_options = {
	get: is_electron ? (key: string) => conf.get(key) : undefined,
	set: is_electron ? (key: string, value: any) => conf.set(key, value) : undefined
}
