import { deepEqual } from 'stk/react'

import { getAntdTheme } from '@/theme'

import type { ThemeValue } from '@/types'
import type { ThemeConfig } from 'antd'

let target = {} as { theme: ThemeValue; value: ThemeConfig } | null

export default (theme: ThemeValue) => {
	if (!deepEqual(theme, target?.theme)) {
		target = { theme, value: getAntdTheme(theme) }
	}

	return target?.value
}
