import { deepEqual } from 'stk/react'

import { getAntdTheme } from '@/theme'

import type { ThemeValue } from '@/types'
import type { ThemeConfig } from 'antd'

let target = {} as { theme: ThemeValue; value: ThemeConfig; glass: boolean } | null

export default (theme: ThemeValue, glass: boolean) => {
	if (!deepEqual(theme, target?.theme) || !deepEqual(glass, target?.glass)) {
		target = { theme, glass, value: getAntdTheme(theme, glass) }
	}

	return target?.value
}
