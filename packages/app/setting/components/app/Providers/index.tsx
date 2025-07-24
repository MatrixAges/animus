import { useMemo, useState } from 'react'
import { providers } from 'fst/llm'
import { observer } from 'mobx-react-lite'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { useTranslation } from 'react-i18next'
import { toJSONSchema } from 'zod'

import { Show } from '@/components'
import { useGlobal } from '@/context'
import { useDelegate } from '@/hooks'
import { GridFourIcon, PlusIcon, RowsIcon } from '@phosphor-icons/react'

import { Form, ProviderItem } from './components'

import styles from './index.module.css'

import type { Provider, ProviderKey } from 'fst/llm'
import type { JSONSchema7 } from 'json-schema'

const provider_keys = Object.keys(providers)

const Index = () => {
	const global = useGlobal()
	const { t } = useTranslation()
	const [type, setType] = useState<'list' | 'grid'>('grid')
	const [current, setCurrent] = useState<ProviderKey | null>(null)

	const ref_type = useDelegate(v => setType(v), { item_type: 'span' })
	const ref_current = useDelegate(v => setCurrent(v === current ? null : v), { ignore_el: 'switch' })

	const provider = useMemo(() => (current ? providers[current] : null), [current])

	const schema = useMemo(
		() =>
			current
				? (toJSONSchema(providers[current].schema, {
						target: 'draft-7',
						unrepresentable: 'any'
					}) as JSONSchema7)
				: null,
		[current]
	)

	const ProviderForm = (
		<div className='provider_form w_100 border_box'>
			<Form
				name={current?.replace('_', ' ')!}
				links={provider?.links!}
				schema={schema!}
				config={provider?.config as Provider}
			></Form>
		</div>
	)

	const Providers = provider_keys.map(key => {
		const Provider = <ProviderItem id={key} active={current === key} key={key}></ProviderItem>

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
					<div className='btn_add flex justify_center align_center clickable'>
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
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
