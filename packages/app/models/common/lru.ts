import { cloneDeep } from 'es-toolkit'
import { LRUMapWithDelete } from 'mnemonist'
import { makeAutoObservable } from 'mobx'
import { setStorageWhenChange } from 'stk/mobx'

import type { Lambda } from 'mobx'

export default class Index<T = any> {
	map = null as unknown as LRUMapWithDelete<string, T | null>
	disposer = null as unknown as Lambda

	get all() {
		return this.map ? Object.fromEntries(this.map.entries()) : {}
	}

	constructor() {
		makeAutoObservable(this, { disposer: false }, { autoBind: true })
	}

	init(name: string, capacity?: number) {
		capacity = capacity || 12

		this.map = new LRUMapWithDelete<string, T>(capacity)

		this.disposer = setStorageWhenChange(
			[
				{
					map: {
						local_key: name,
						toStorage: (v: Index['map']) => Object.fromEntries(v.entries()),
						fromStorage: (v: Record<string, T>) => {
							return LRUMapWithDelete.from(
								Object.fromEntries(
									Object.keys(v)
										.reverse()
										.map(key => [key, v[key]])
								),
								capacity
							)
						}
					}
				}
			],
			this
		)
	}

	get(key: string) {
		return this.map.get(key)
	}

	set(key: string, value?: T) {
		this.map.set(key, value || null)

		this.map = cloneDeep(this.map)
	}

	remove(key: string) {
		this.map.remove(key)

		this.map = cloneDeep(this.map)
	}

	clear() {
		this.map.clear()

		this.map = cloneDeep(this.map)
	}

	off() {
		this.disposer?.()
	}
}
