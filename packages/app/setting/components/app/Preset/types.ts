import type { Preset } from '@/models'

export interface IPropsConfig {
	configs: Preset['configs']
	setConfigs: Preset['setConfigs']
}

export interface IPropsConfigItem {
	index: number
	remove: (index: number) => void
}

export interface IPropsPrompt {
	prompts: Preset['prompts']
	setPrompts: Preset['setPrompts']
}
