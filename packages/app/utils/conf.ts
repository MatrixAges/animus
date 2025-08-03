import { Conf } from 'electron-conf/renderer'

import { ipc } from '@/utils'

import { is_electron } from './is'

import type { StoreOptions } from 'stk/mobx'

const conf = new Conf<any>({ name: 'appdata' })

export default conf

export const store_options: StoreOptions = {
	get: is_electron ? (key: string) => conf.get(key) : undefined,
	set: is_electron ? (key: string, value: any) => conf.set(key, $copy(value)) : undefined
}

export const getUserStoreOptions = (module: string, filename?: string) => {
	return {
		get: is_electron ? (key: string) => ipc.store.get.query({ module, key, filename }) : undefined,
		set: is_electron
			? (key: string, value: any) => ipc.store.set.mutate({ module, key, value: $copy(value), filename })
			: undefined
	} as StoreOptions
}
