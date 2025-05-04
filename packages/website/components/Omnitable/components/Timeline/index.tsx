import { Bar, BarChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

import { $ } from '@website/utils'

import styles from './index.module.css'
import { default as TooltipContent } from './Tooltip'

import type { IPropsTimeline } from '../../types'

const Index = (props: IPropsTimeline) => {
	const { timeline_items } = props

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
						dataKey='duration'
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
						content={TooltipContent}
					/>

					<Bar dataKey='' stackId='a' background={{ fill: 'rgba(var(--color_text_rgb),0.03)' }} />
					<Bar dataKey='5xx' stackId='a' fill='rgba(var(--color_danger_rgb),0.6)' />
					<Bar dataKey='4xx' stackId='a' fill='rgba(var(--color_warning_rgb),0.6)' />
					<Bar dataKey='2xx' stackId='a' fill='rgba(var(--color_text_rgb),0.06)' />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default $.memo(Index)
