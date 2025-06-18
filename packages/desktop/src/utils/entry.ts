import { app, nativeTheme } from 'electron'

import { conf } from './index'

import type { Theme } from '@app/types'

conf.registerRendererListener()

if (!app.requestSingleInstanceLock()) app.exit()

app.commandLine.appendSwitch('lang', 'en-US')

nativeTheme.themeSource = ((await conf.get('theme_source')) || 'system') as Theme
