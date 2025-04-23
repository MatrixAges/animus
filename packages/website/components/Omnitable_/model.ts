import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'

import type { Omnitable } from './types'

@injectable()
export default class Index {
	config = null as unknown as Omnitable.Config

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}
}
