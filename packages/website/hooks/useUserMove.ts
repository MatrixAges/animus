import { useRef, useState } from 'react'
import { useEventListener, useMemoizedFn } from 'ahooks'
import { throttle } from 'lodash-es'

interface Args {
	throttle_time?: number
	duration?: number
	idle?: () => void
}

export default (args?: Args) => {
	const { throttle_time = 300, duration = 1800, idle } = args || {}
	const [value, setValue] = useState(false)
	const timer = useRef<NodeJS.Timeout>(null)

	const move = useMemoizedFn(
		throttle(
			() => {
				if (timer.current) clearTimeout(timer.current)

				setValue(true)

				timer.current = setTimeout(() => {
					setValue(false)
					idle?.()
				}, duration)
			},
			throttle_time,
			{ leading: false }
		)
	)

	useEventListener('mousemove', move)
	useEventListener('touchmove', move)

	return value
}
