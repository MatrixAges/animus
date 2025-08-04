import { makeAutoObservable } from 'mobx'
import { injectable } from 'tsyringe'
import { providers } from 'fst/llm'
import { ipc, capitalizeFirst, confirm } from '@/utils'

import type { Provider, ProviderKey, Links } from 'fst/llm'

@injectable()
export default class Index {
	type = 'grid' as 'list' | 'grid'
	current = null as ProviderKey | null
	provider_list = providers as unknown as Record<ProviderKey, { links: Links; config: Provider }>
	visible_mutate_modal = false
	mutate_provider_item = null as ({ name: ProviderKey } & Links) | null

	get providers() {
		return Object.keys(this.provider_list).reduce(
			(total, key) => {
				const item = this.provider_list[key as ProviderKey]

				if (item.config.enabled) {
					total.push({
						label: key
							.split('_')
							.map(i => capitalizeFirst(i))
							.join(' '),
						options: item.config.models.reduce(
							(to, i) => {
								const target_items = i.items
									.filter(m => m.enabled)
									.map(m => ({
										label: m.name,
										value: m.id,
										provider: key,
										group: i.group
									}))

								to.push(...target_items)

								return to
							},
							[] as Array<{ label: string; value: string }>
						)
					})
				}

				return total
			},
			[] as Array<{ label: string; options: Array<{ label: string; value: string }> }>
		)
	}

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	async init() {
		await this.getProviders()
	}

	mutateProvider(v: Index['mutate_provider_item'], prev_name?: string) {
		const { name, ...links } = v!

		const error_message = $t('setting.providers.provider_exsit')

		if (prev_name) {
			if (prev_name === name) {
				this.setProvider(name, { links })
			} else {
				if (name in this.provider_list) return $message.error(error_message)

				const prev_config = this.provider_list[prev_name as ProviderKey].config

				delete this.provider_list[prev_name as ProviderKey]

				this.setProvider(name, {
					links,
					config: prev_config
				})

				this.current = name
			}
		} else {
			if (name in this.provider_list) return $message.error(error_message)

			this.setProvider(name, {
				links,
				config: { enabled: false, api_base_url: '', api_key: '', models: [] }
			})
		}

		this.visible_mutate_modal = false
	}

	setProvider(name: ProviderKey, v: { links?: Links; config?: Partial<Provider & { api_base_url: string }> }) {
		const { links, config } = v

		if (!this.provider_list[name]) {
			this.provider_list[name] = {} as { links: Links; config: Provider }
		}

		const target = this.provider_list[name]

		if (links) target.links = links
		if (config) target.config = { ...target.config, ...v.config }

		this.setProviders()
	}

	async removeProvider(name: string) {
		const res = await confirm({ title: $t('notice'), content: $t('config_remove_confirm'), zIndex: 1000000 })

		if (!res) return

		this.current = null

		delete this.provider_list[name as ProviderKey]

		this.setProviders()
	}

	async getProviders() {
		const res = await ipc.file.read.query({ module: 'global', filename: 'providers' })

		if (!res) return this.setProviders()

		this.provider_list = res
	}

	async setProviders(v?: Index['providers']) {
		this.provider_list = $copy(this.provider_list)

		ipc.file.write.mutate({ module: 'global', filename: 'providers', data: $copy(v ?? this.provider_list) })
	}
}
