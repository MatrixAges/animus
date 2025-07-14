import type { StoreOptions } from 'stk/mobx'
import type Model from './model'

export interface IProps {
	store_options?: StoreOptions
}

export interface IPropsFile {}

export interface IPropsSystemPrompt {
	system_prompt: Model['system_prompt']
	setSystemPrompt: (v: Model['system_prompt']) => void
}

export interface IPropsConfig {
	prompt_rewriting: Model['prompt_rewriting']
	use_preset: Model['use_preset']
	newline_by_enter: Model['newline_by_enter']
	web_search_enabled: Model['web_search_enabled']
	web_search_engine: Model['web_search_engine']
	setPromptRewriting: (v: Model['prompt_rewriting']) => void
	setUsePreset: (v: Model['use_preset']) => void
	setNewLineByEnter: (v: Model['newline_by_enter']) => void
	setWebSearchEnabled: (v: Model['web_search_enabled']) => void
	setWebSearchEngine: (v: Model['web_search_engine']) => void
}

export interface IPropsSetting {
	temperature: Model['temperature']
	top_p: Model['top_p']
	max_ouput_tokens: Model['max_ouput_tokens']
	setTemperature: (v: Model['temperature']) => void
	setTopP: (v: Model['top_p']) => void
	setMaxOutputTokens: (v: Model['max_ouput_tokens']) => void
}

export interface IPropsModelSelect {
	select_model: Model['select_model']
	setSelectModel: (v: Model['select_model']) => void
}
