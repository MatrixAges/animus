import { useState } from 'react'
import { Popover, Switch } from 'antd'
import { useTranslation } from 'react-i18next'

import { engines } from '@/appdata'
import { useDelegate } from '@/hooks'
import { SlidersHorizontalIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { IPropsConfig } from '../../types'

const Index = (props: IPropsConfig) => {
	const {
		prompt_rewriting,
		newline_by_enter,
		web_search_enabled,
		web_search_engine,
		setPromptRewriting,
		setNewLineByEnter,
		setWebSearchEnabled,
		setWebSearchEngine
	} = props
	const { t } = useTranslation()
	const [visible, setVisible] = useState(false)

	const ref = useDelegate(setWebSearchEngine, { visible })

	const Content = (
		<div className='config_items border_box flex flex_column'>
			<div className='config_item w_100 flex justify_between align_center'>
				<div className='title_wrap flex align_center'>
					<span className='title'>{t('chatbox.prompt_rewriting')}</span>
				</div>
				<Switch size='small' value={prompt_rewriting} onChange={setPromptRewriting}></Switch>
			</div>
			<div className='config_item w_100 flex justify_between align_center'>
				<div className='title_wrap flex align_center'>
					<span className='title'>{t('chatbox.newline_by_enter')}</span>
				</div>
				<Switch size='small' value={newline_by_enter} onChange={setNewLineByEnter}></Switch>
			</div>
			<div className='config_item flex flex_column'>
				<div className='header w_100 flex justify_between align_center'>
					<span className='title'>{t('chatbox.web_search')}</span>
					<Switch size='small' value={web_search_enabled} onChange={setWebSearchEnabled}></Switch>
				</div>
				<div className='engine_wrap w_100 border_box flex flex_column' ref={ref}>
					<div className='engine_items w_100 border_box flex'>
						{engines.map(item => (
							<div
								className={$cx(
									'engine_item flex flex_column align_center clickit',
									item.key,
									web_search_engine === item.key && 'active'
								)}
								data-key={item.key}
								key={item.key}
							>
								<div className='logo_wrap flex justify_center align_center'>
									<item.logo />
								</div>
								<span className='name'>{item.key}</span>
							</div>
						))}
					</div>
					<div
						className={$cx(
							'builtin_engine w_100 border_box flex justify_center align_center clickit',
							web_search_engine === 'builtin' && 'active'
						)}
						data-key='builtin'
					>
						<span>{t('chatbox.builtin_search')}</span>
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Popover
			rootClassName={styles._local}
			trigger={['click']}
			placement='bottom'
			destroyOnHidden
			content={Content}
			onOpenChange={setVisible}
		>
			<div>
				<div className='option_item flex justify_center align_center clickit'>
					<SlidersHorizontalIcon></SlidersHorizontalIcon>
				</div>
			</div>
		</Popover>
	)
}

export default $app.memo(Index)
