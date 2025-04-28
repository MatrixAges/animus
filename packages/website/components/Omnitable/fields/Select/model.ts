import { message } from 'antd'
import to from 'await-to-js'
import { debounce } from 'lodash-es'
import { makeAutoObservable } from 'mobx'
import { ofetch } from 'ofetch'
import { decode, encode } from 'stk/storage'

import type { SelectProps } from 'antd'
import type { Omnitable } from '../../types'
import type { useAppProps } from 'antd/es/app/context'

type Options = Array<Omnitable.SelectOption>

export default class Index {
	antd = null as unknown as useAppProps
	base_url = ''
	remote = null as unknown as Omnitable.Select['props']['remote']
	multiple = false
	search_props = {} as SelectProps<any, Omnitable.SelectOption>

	setOptions = null as unknown as (v: Array<Omnitable.SelectOption>) => void

	constructor() {
		makeAutoObservable(
			this,
			{ antd: false, base_url: false, remote: false, multiple: false, setOptions: false },
			{ autoBind: true }
		)
	}

	init(args: {
		antd: Index['antd']
		base_url: string
		remote: Index['remote']
		multiple: Index['multiple']
		setOptions: (v: Array<Omnitable.SelectOption>) => void
	}) {
		const { antd, base_url, remote, multiple, setOptions } = args

		this.antd = antd
		this.base_url = base_url
		this.setOptions = setOptions

		if (remote) {
			this.remote = remote

			if (this.remote.search) {
				this.search_props = {
					showSearch: true,
					filterOption: false,
					defaultActiveFirstOption: false,
					onSearch: debounce(this.search, 450, { leading: false })
				}
			} else {
				this.get()
			}
		}

		this.multiple = multiple
	}

	async get() {
		const remote = this.remote!

		const query = remote.query!
		const session_key = `${remote.api}|${new URLSearchParams(query).toString()}`
		const session_cache = decode(sessionStorage.getItem(session_key)) as Options

		if (session_cache) return this.setOptions(session_cache)

		const url = remote.api.indexOf('https') !== -1 ? remote.api : `${this.base_url}${remote.api}`

		const [err, res] = await to<Omnitable.Error | Options>(ofetch(url, { query }))

		if (err) {
			this.antd.message.error(`Query error: ${err?.message}`)

			return false
		}

		if ('error' in res) {
			this.antd.message.error(`${res.error}: ${res.message}`)

			return false
		}

		this.setOptions(res)

		sessionStorage.setItem(session_key, encode(res))
	}

	async search(v: string) {
		const remote = this.remote!
		const search = remote.search!
		const query = { ...remote.query, [search]: v }
		const url = remote.api.indexOf('https') !== -1 ? remote.api : `${this.base_url}${remote.api}`

		const [err, res] = await to<Omnitable.Error | Options>(ofetch(url, { query }))

		if (err) {
			this.antd.message.error(`Query error: ${err?.message}`)

			return false
		}

		if ('error' in res) {
			this.antd.message.error(`${res.error}: ${res.message}`)

			return false
		}

		this.setOptions(res)
	}
}
