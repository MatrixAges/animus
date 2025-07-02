import common_antd from './common/antd'
import dark from './dark'
import light from './light'

import type { ThemeValue } from '@/types'
import type { ThemeConfig } from 'antd'
import type { DeepRequired } from 'ts-essentials'

export const getVars = (theme: ThemeValue) => {
	switch (theme) {
		case 'light':
			return light
		case 'dark':
			return dark
	}
}

export default (theme: ThemeValue, glass: boolean) => {
	const is_dark = theme === 'dark'
	const vars = getVars(theme)

	const getTargetConfig = <T extends object>(
		common: Partial<T>,
		dark_config: Partial<T>,
		light_config: Partial<T>
	) => {
		return Object.assign(common, is_dark ? dark_config : light_config) as T
	}

	const boxShadowSecondary = is_dark && !glass ? 'unset' : 'var(--shadow)'

	return {
		cssVar: true,
		hashed: false,
		token: {
			...common_antd.token,
			colorPrimary: vars.color_text,
			colorText: vars.color_text,
			colorTextBase: vars.color_text,
			colorBgBase: vars.color_bg_1,
			colorBgContainer: 'var(--bg_component)',
			colorBgElevated: 'var(--bg_dropdown)',
			colorBgLayout: vars.color_bg_1,
			colorFillTertiary: vars.color_bg_1,
			colorBorder: vars.color_border_soft,
			colorBorderSecondary: vars.color_border_softlight,
			controlItemBgActive: 'var(--bg_selected)',
			boxShadow: 'var(--shadow)',
			borderRadiusXS: 2,
			borderRadiusSM: 4,
			borderRadius: 6
		},
		components: {
			Button: {
				defaultShadow: 'unset'
			},
			Select: {
				optionActiveBg: 'var(--bg_selected)',
				optionPadding: '0 8px',
				optionHeight: 26,
				optionLineHeight: '26px'
			},
			Switch: getTargetConfig<DeepRequired<ThemeConfig>['components']['Switch']>(
				{
					handleSizeSM: 10,
					trackHeightSM: 16,
					trackMinWidthSM: 28,
					handleShadow: 'unset'
				},
				{
					handleBg: 'rgba(var(--color_contrast_rgb),0.6)',
					colorPrimary: 'rgba(var(--color_contrast_rgb),0.24)',
					colorPrimaryHover: 'rgba(var(--color_contrast_rgb),0.18)',
					colorTextTertiary: 'var(--bg_component)',
					colorTextQuaternary: 'var(--bg_component)'
				},
				{
					handleBg: 'rgba(var(--color_std_rgb),0.9)',
					colorPrimary: 'rgba(var(--color_contrast_rgb),0.72)',
					colorPrimaryHover: 'rgba(var(--color_contrast_rgb),0.81)',
					colorTextTertiary: 'rgba(var(--color_contrast_rgb),0.06)',
					colorTextQuaternary: 'rgba(var(--color_contrast_rgb),0.06)'
				}
			),
			DatePicker: {
				cellHeight: 26,
				cellWidth: 26,
				fontSize: 12
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
				railSize: 2.4,
				handleSize: 8,
				handleSizeHover: 8,
				handleLineWidth: 1.6,
				handleLineWidthHover: 1.6,
				handleActiveOutlineColor: 'transparent',
				railBg: 'rgba(var(--color_contrast_rgb),0.06)',
				railHoverBg: 'rgba(var(--color_contrast_rgb),0.12)'
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
			},
			Dropdown: {
				controlItemBgHover: vars.color_bg_2
			},
			Tooltip: {
				colorBgSpotlight: 'var(--bg_dropdown)',
				fontSize: 12,
				colorTextLightSolid: 'var(--color_text)',
				boxShadowSecondary
			},
			Popover: {
				boxShadowSecondary
			}
		}
	} as ThemeConfig
}
