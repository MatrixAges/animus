import { match } from 'ts-pattern'

import common_antd from './common/antd'
import dark from './dark'
import light from './light'

import type { Theme } from '@/types'
import type { ThemeConfig } from 'antd'

export const getVars = (theme: Theme) => {
	return match(theme)
		.with('light', () => light)
		.with('dark', () => dark)
		.exhaustive()
}

export default (theme: Theme) => {
	const vars = getVars(theme)

	return {
		cssVar: true,
		hashed: false,
		token: {
			...common_antd.token,
			colorPrimary: vars.color_text,
			colorText: vars.color_text,
			colorTextBase: vars.color_text,
			colorBgBase: vars.color_bg_1,
			colorBgContainer: vars.color_bg_1,
			colorBgElevated: vars.color_bg_1,
			colorBgLayout: vars.color_bg_1,
			colorFillTertiary: vars.color_bg_1,
			colorBorder: theme === 'dark' ? vars.color_border_light : vars.color_border_soft,
			colorBorderSecondary: vars.color_border_soft,
			controlItemBgActive: vars.color_bg_2,
			boxShadow: vars.shadow,
			borderRadiusXS: 2,
			borderRadiusSM: 4,
			borderRadius: 6
		},
		components: {
			Button: {
				defaultShadow: 'unset'
			},
			Select: {
				optionActiveBg: vars.color_bg_2,
				optionPadding: '0 8px',
				optionHeight: 26,
				optionLineHeight: '26px'
			},
			DatePicker: {
				cellHeight: 26,
				cellWidth: 26,
				fontSize: 12
			},
			Dropdown: {
				controlItemBgHover: vars.color_bg_2
			},
			Input: {
				colorPrimaryHover: vars.color_text_grey
			},
			Segmented: {
				borderRadiusSM: 6,
				borderRadiusXS: 4,
				controlHeightSM: 24,
				colorBgLayout: vars.color_bg_1
			},
			Slider: {
				handleSize: 8,
				handleSizeHover: 10
			},
			Radio: {
				dotSize: 9,
				radioSize: 12
			},
			Checkbox: {
				colorPrimary: vars.color_text_sub,
				colorPrimaryHover: vars.color_text,
				lineType: 'none'
			},
			Pagination: {
				controlHeight: 24
			}
		}
	} as ThemeConfig
}
