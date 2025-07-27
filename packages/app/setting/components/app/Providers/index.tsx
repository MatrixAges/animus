import { useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'
import { schema as default_schema, providers_schema } from 'fst/llm'
import { observer } from 'mobx-react-lite'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { useTranslation } from 'react-i18next'
import { toJSONSchema } from 'zod'

import { Modal, Show } from '@/components'
import { useGlobal } from '@/context'
import { useDelegate } from '@/hooks'
import { GridFourIcon, PlusIcon, RowsIcon } from '@phosphor-icons/react'

import { Form, MutateProviderForm, ProviderItem } from './components'

import styles from './index.module.css'

import type { Provider, ProviderKey } from 'fst/llm'
import type { JSONSchema7 } from 'json-schema'
import type { ZodObject } from 'zod'

const Index = () => {
	const global = useGlobal()
	const { t } = useTranslation()

	const x = global.provider
	const type = x.type
	const current = x.current
	const provider_list = $copy(x.provider_list)

	const ref_type = useDelegate(v => (x.type = v), { item_type: 'span' })

	const ref_current = useDelegate(v => (x.current = v === current ? null : v), {
		ignore_el: 'switch'
	})

	const provider_keys = useMemo(() => {
		const enabled_keys = [] as Array<string>
		const disabled_keys = [] as Array<string>

		for (const key in provider_list) {
			if (provider_list[key as ProviderKey].config.enabled) {
				enabled_keys.push(key)
			} else {
				disabled_keys.push(key)
			}
		}

		return [...enabled_keys, ...disabled_keys]
	}, [provider_list])

	const target = useMemo(() => (current ? provider_list[current] : null), [provider_list, current])

	const schema = useMemo(() => {
		if (!current) return null

		let target_schema = default_schema

		if (current in providers_schema) {
			target_schema = providers_schema[current as keyof typeof providers_schema] as ZodObject<any>
		}

		return toJSONSchema(target_schema, {
			target: 'draft-7',
			unrepresentable: 'any'
		}) as JSONSchema7
	}, [current])

	const enableProvider = useMemoizedFn((name: ProviderKey, v: boolean) => {
		x.setProvider(name, { config: { enabled: v } })
	})

	const onEditProvider = useMemoizedFn(v => {
		x.mutate_provider_item = { name: v, ...provider_list[v as ProviderKey].links }
		x.visible_mutate_modal = true
	})

	const toggleMutateProviderModal = useMemoizedFn(() => {
		x.visible_mutate_modal = !x.visible_mutate_modal
		x.mutate_provider_item = null
	})

	const ProviderForm = (
		<div className='provider_form w_100 border_box'>
			<Form
				id={current!}
				name={current?.replace('_', ' ')!}
				schema={schema!}
				links={target?.links!}
				config={target?.config as Provider}
				setProvider={x.setProvider}
				onEditProvider={onEditProvider}
				removeProvider={x.removeProvider}
			></Form>
		</div>
	)

	const Providers = provider_keys.map(key => {
		const Provider = (
			<ProviderItem
				id={key as ProviderKey}
				enabled={provider_list[key as ProviderKey].config.enabled}
				active={current === key}
				enableProvider={enableProvider}
				key={key}
			></ProviderItem>
		)

		return type === 'grid' ? (
			Provider
		) : (
			<div className='provider_wrap w_100 border_box flex flex_column' key={key}>
				{Provider}
				<Show
					className='w_100'
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: 'auto', opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					visible={type === 'list' && current && current === key}
				>
					{ProviderForm}
				</Show>
			</div>
		)
	})

	return (
		<div className={$cx('w_100 flex flex_column', styles._local)}>
			<div className='section_header flex justify_between align_center'>
				<div className='flex align_center'>
					<span className='setting_title'>{t('setting.providers.title')}</span>
					<span className='counts'>{provider_keys.length}</span>
				</div>
				<div className='right_wrap flex align_center'>
					<div
						className='btn_add flex justify_center align_center clickable'
						onClick={toggleMutateProviderModal}
					>
						<PlusIcon></PlusIcon>
					</div>
					<div className='type_wrap flex' ref={ref_type}>
						<span
							className={$cx(
								'btn_type flex justify_center align_center clickable',
								type === 'list' && 'active'
							)}
							data-key='list'
						>
							<RowsIcon></RowsIcon>
						</span>
						<span
							className={$cx(
								'btn_type flex justify_center align_center clickable',
								type === 'grid' && 'active'
							)}
							data-key='grid'
						>
							<GridFourIcon></GridFourIcon>
						</span>
					</div>
				</div>
			</div>
			<div className={$cx('providers_wrap w_100 border_box flex', type === 'grid' && current && 'scroll')}>
				<div
					className={$cx(
						'providers w_100 border_box flex',
						type,
						type === 'list' && 'flex_column',
						type === 'grid' && !current && 'flex_wrap'
					)}
					ref={ref_current}
				>
					{type === 'grid' && current ? <ScrollMenu>{Providers}</ScrollMenu> : Providers}
				</div>
			</div>
			<Show
				className='w_100'
				initial={{ height: 0, opacity: 0 }}
				animate={{ height: 'auto', opacity: 1 }}
				exit={{ height: 0, opacity: 0 }}
				visible={type === 'grid' && current !== null}
			>
				{ProviderForm}
			</Show>
			<Modal
				title='Add Provider'
				global
				z_index={100000}
				open={x.visible_mutate_modal}
				onClose={toggleMutateProviderModal}
			>
				<MutateProviderForm
					mutate_provider_item={x.mutate_provider_item}
					mutateProvider={x.mutateProvider}
				></MutateProviderForm>
			</Modal>
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
