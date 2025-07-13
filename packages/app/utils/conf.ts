import { Conf } from 'electron-conf/renderer'

import { is_electron } from './is'

import type { StoreOptions } from 'stk/mobx'

const conf = new Conf<any>({ name: 'appdata' })

export default conf

export const store_options: StoreOptions = {
	get: is_electron ? (key: string) => conf.get(key) : undefined,
	set: is_electron ? (key: string, value: any) => conf.set(key, $copy(value)) : undefined
}
