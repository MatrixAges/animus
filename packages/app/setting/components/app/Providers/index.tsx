import { useMemo, useState } from 'react'
import { Switch } from 'antd'
import { providers } from 'fst/llm'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { toJSONSchema } from 'zod'

import { ProviderIcon, Show } from '@/components'
import { useGlobal } from '@/context'
import { useDelegate } from '@/hooks'
import { GridFourIcon, ListIcon } from '@phosphor-icons/react'

import { Form } from './components'

import styles from './index.module.css'

import type { Provider, ProviderKey } from 'fst/llm'
import type { JSONSchema7 } from 'json-schema'

const provider_keys = Object.keys(providers)

const Index = () => {
	const global = useGlobal()
	const { t } = useTranslation()
	const [type, setType] = useState<'list' | 'grid'>('list')
	const [current, setCurrent] = useState<ProviderKey | null>(null)

	const ref_type = useDelegate(v => setType(v), { item_type: 'span' })
	const ref_current = useDelegate(v => setCurrent(v === current ? null : v))

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

	return (
		<div className={$cx('w_100 flex flex_column', styles._local)}>
			<div className='section_header flex justify_between align_center'>
				<div className='flex align_center'>
					<span className='setting_title'>{t('setting.providers.title')}</span>
					<span className='counts'>{provider_keys.length}</span>
				</div>
				<div className='type_wrap flex' ref={ref_type}>
					<span
						className={$cx(
							'btn_type flex justify_center align_center clickable',
							type === 'list' && 'active'
						)}
						data-key='list'
					>
						<ListIcon></ListIcon>
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
			<Show visible={provider !== null}></Show>
			<div className='providers_wrap w_100 border_box flex'>
				<div
					className={$cx(
						'providers w_100 border_box flex',
						type,
						type === 'list' ? 'flex_column' : 'flex_wrap'
					)}
					ref={ref_current}
				>
					{provider_keys.map(key => (
						<div className='w_100 border_box flex flex_column' key={key}>
							<div
								className={$cx(
									'provider border_box flex flex_column align_center relative cursor_point',
									current === key && 'active'
								)}
								data-key={key}
							>
								<div className='icon_wrap flex'>
									<ProviderIcon name={key}></ProviderIcon>
								</div>
								<div className='name text_center flex flex_column'>
									{key.split('_').map(item => (
										<span key={item}>{item}</span>
									))}
								</div>
								<Switch className='switch none absolute' size='small'></Switch>
							</div>
							<If condition={current && current === key}>
								<div className='provider_form w_100 border_box'>
									<Form
										name={key.replace('_', ' ')}
										links={provider?.links!}
										schema={schema!}
										config={provider?.config as Provider}
									></Form>
								</div>
							</If>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
