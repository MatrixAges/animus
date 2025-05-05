import { Bar, BarChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

import { $ } from '@website/utils'

import styles from './index.module.css'
import { default as TooltipContent } from './Tooltip'

import type { IPropsTimeline } from '../../types'

export const preset_color = {
	light: 'rgba(var(--color_text_rgb),0.06)',
	dark: 'rgba(var(--color_text_rgb),0.6)',
	success: 'rgba(var(--color_success_rgb),0.6)',
	warning: 'rgba(var(--color_warning_rgb),0.6)',
	danger: 'rgba(var(--color_danger_rgb),0.6)'
}

const Index = (props: IPropsTimeline) => {
	const { timeline_type, label_bind, items, timeline_items } = props

	return (
		<div className={$.cx(styles._local)}>
			<ResponsiveContainer width='100%' height={60}>
				<BarChart
					margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
					maxBarSize={30}
					barCategoryGap={2}
					data={timeline_items}
				>
					<XAxis
						dataKey={label_bind}
						tickLine={false}
						axisLine={false}
						fontSize={10}
						tick={{ fill: 'var(--color_text_light)', dy: 0 }}
					/>
					<Tooltip
						wrapperStyle={{ zIndex: 1000 }}
						cursor={{
							fill: 'transparent',
							stroke: 'var(--color_text)',
							strokeWidth: 1
						}}
						content={args => (
							<TooltipContent timeline_type={timeline_type} items={items} {...args} />
						)}
					/>

					<Bar dataKey='' stackId='a' background={{ fill: 'rgba(var(--color_text_rgb),0.03)' }} />
					{items.map(item => (
						<Bar
							dataKey={item.bind}
							stackId='a'
							fill={
								item.color in preset_color
									? preset_color[item.color as keyof typeof preset_color]
									: item.color
							}
						/>
					))}
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default $.memo(Index)
