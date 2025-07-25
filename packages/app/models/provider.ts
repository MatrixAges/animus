import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'
import { providers } from 'fst/llm'
import { ipc, capitalizeFirst } from '@/utils'

import type { Provider, Model, ProviderKey, Links } from 'fst/llm'

@injectable()
export default class Index {
	provider_list = providers

	get providers() {
		return Object.keys(this.provider_list).reduce(
			(total, key) => {
				const item = this.provider_list[key as ProviderKey]

				if (item.config.enabled) {
					total.push({
						name: key
							.split('_')
							.map(i => capitalizeFirst(i))
							.join(' '),
						models: item.config.models.reduce((to, i) => {
							to.push(...i.items.filter(m => m.enabled))

							return to
						}, [] as Array<Model>)
					})
				}

				return total
			},
			[] as Array<{ name: string; models: Array<Model> }>
		)
	}

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	async init() {
		await this.getProviders()
	}

	setProvider(name: ProviderKey, v: { links?: Links; config?: Partial<Provider> }) {
		const { links, config } = v
		const target = this.provider_list[name]

		if (links) target.links = links
		if (config) target.config = { ...target.config, ...v.config }

		this.setProviders()
	}

	async getProviders() {
		const res = await ipc.file.read.query({ module: 'global', filename: 'providers' })

		if (!res) return this.setProviders()

		this.provider_list = res
	}

	async setProviders(v?: Index['providers']) {
		ipc.file.write.mutate({ module: 'global', filename: 'providers', data: $copy(v ?? this.provider_list) })
	}
}
