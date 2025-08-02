import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { useGlobal } from '@/context'
import { useDelegate } from '@/hooks'
import { FadersHorizontalIcon, LightbulbFilamentIcon } from '@phosphor-icons/react'

import { Config, Prompt } from './components'

import styles from './index.module.css'

import type { IPropsConfig, IPropsPrompt } from './types'

const Index = () => {
	const global = useGlobal()
	const { t } = useTranslation()

	const x = global.preset

	const ref = useDelegate(v => x.onChangeTab(v))

	const props_config: IPropsConfig = {
		configs: $copy(x.configs),
		setConfigs: x.setConfigs
	}

	const props_prompt: IPropsPrompt = {
		prompts: $copy(x.prompts),
		setPrompts: x.setPrompts
	}

	return (
		<div className={$cx('w_100 border_box flex flex_column', styles._local)}>
			<div className='header_wrap flex justify_between align_center'>
				<span className='setting_title'>{t('setting.preset.title')}</span>
				<div className='tab_items flex align_center' ref={ref}>
					<div
						className={$cx(
							'tab_item flex align_center clickable',
							x.tab === 'config' && 'active'
						)}
						data-key='config'
					>
						<FadersHorizontalIcon weight='bold'></FadersHorizontalIcon>
						<span>Config</span>
					</div>
					<div
						className={$cx(
							'tab_item flex align_center clickable',
							x.tab === 'prompt' && 'active'
						)}
						data-key='prompt'
					>
						<LightbulbFilamentIcon weight='bold'></LightbulbFilamentIcon>
						<span>Prompt</span>
					</div>
				</div>
			</div>
			<Choose>
				<When condition={x.tab === 'config'}>
					<Config {...props_config}></Config>
				</When>
				<When condition={x.tab === 'prompt'}>
					<Prompt {...props_prompt}></Prompt>
				</When>
			</Choose>
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
