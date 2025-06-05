import { useMemo } from 'react'

import { getAntdTheme } from '@/theme'

import type { Theme } from '@/types'

export default (theme: Theme) => {
	return useMemo(() => getAntdTheme(theme), [theme])
}
