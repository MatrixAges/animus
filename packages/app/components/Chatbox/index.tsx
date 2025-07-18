import { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { container } from 'tsyringe'

import { useStackEffect } from '@/hooks'
import { ArrowElbowDownLeftIcon, ArrowUpIcon, CommandIcon } from '@phosphor-icons/react'

import { Config, File, ModelSelect, Setting, SystemPrompt } from './components'
import Model from './model'

import styles from './index.module.css'

import type { IProps, IPropsConfig, IPropsFile, IPropsModelSelect, IPropsSetting, IPropsSystemPrompt } from './types'

const Index = (props: IProps) => {
	const { store_options } = props
	const [x] = useState(container.resolve(Model))
	const { t } = useTranslation()

	const { bind } = useStackEffect({
		mounted: () => x.init({ store_options }),
		unmounted: () => x.off(),
		deps: [store_options]
	})

	const props_file: IPropsFile = {}

	const props_system_prompt: IPropsSystemPrompt = {
		system_prompt: x.system_prompt,
		setSystemPrompt: useMemoizedFn(v => (x.system_prompt = v))
	}

	const props_config: IPropsConfig = {
		prompt_rewriting: x.prompt_rewriting,
		use_preset: x.use_preset,
		newline_by_enter: x.newline_by_enter,
		web_search_enabled: x.web_search_enabled,
		web_search_engine: x.web_search_engine,
		setPromptRewriting: useMemoizedFn(v => (x.prompt_rewriting = v)),
		setUsePreset: useMemoizedFn(v => (x.use_preset = v)),
		setNewLineByEnter: useMemoizedFn(v => (x.newline_by_enter = v)),
		setWebSearchEnabled: useMemoizedFn(v => (x.web_search_enabled = v)),
		setWebSearchEngine: useMemoizedFn(v => (x.web_search_engine = v))
	}

	const props_setting: IPropsSetting = {
		temperature: x.temperature,
		top_p: x.top_p,
		max_ouput_tokens: x.max_ouput_tokens,
		setTemperature: useMemoizedFn(v => (x.temperature = v)),
		setTopP: useMemoizedFn(v => (x.top_p = v)),
		setMaxOutputTokens: useMemoizedFn(v => (x.max_ouput_tokens = v))
	}

	const props_model_select: IPropsModelSelect = {
		select_model: $copy(x.select_model),
		setSelectModel: useMemoizedFn(v => (x.select_model = v))
	}

	const setRefTextArea = useMemoizedFn(v => v && (x.ref_textarea = v))

	return (
		<div className={$cx('w_100 border_box flex flex_column relative', styles._local)} ref={bind}>
			<textarea
				className='textarea w_100 border_box'
				placeholder={t('chatbox.placeholder')}
				onCompositionStart={() => (x.compositing = true)}
				onCompositionEnd={() => (x.compositing = false)}
				ref={setRefTextArea}
			></textarea>
			<div className='option_items w_100 border_box flex justify_between align_center absolute bottom_0'>
				<div className='gap_wrap flex align_center'>
					<File {...props_file}></File>
					<SystemPrompt {...props_system_prompt}></SystemPrompt>
					<Config {...props_config}></Config>
					<Setting {...props_setting}></Setting>
				</div>
				<div className='gap_wrap flex align_center'>
					<ModelSelect {...props_model_select}></ModelSelect>
					<div
						className={$cx(
							'btn_submit option_item flex justify_center align_center clickit',
							x.newline_by_enter && 'newline_by_enter'
						)}
						onClick={x.submit}
					>
						<Choose>
							<When condition={x.newline_by_enter}>
								<CommandIcon weight='bold'></CommandIcon>
								<ArrowElbowDownLeftIcon weight='bold'></ArrowElbowDownLeftIcon>
							</When>
							<Otherwise>
								<ArrowUpIcon weight='bold'></ArrowUpIcon>
							</Otherwise>
						</Choose>
					</div>
				</div>
			</div>
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()

export * from './types'
