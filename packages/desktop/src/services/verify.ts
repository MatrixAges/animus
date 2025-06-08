import dayjs from 'dayjs'
import EventEmitter from 'events'

import { conf, decode, now_ms } from '@electron/utils'

import type { App } from '@electron/types'

export const emitter_verify = new EventEmitter()

export const verify = () => {
	const paid_info = conf.get('paid_info') as string

	if (!paid_info) return false

	const data = decode(paid_info)
	const { verify_at, paid_plan, paid_expire } = data as App.PaidInfo

	const days = dayjs().diff(dayjs(verify_at))
	const is_day_overflow = days >= 27

	if (paid_plan && paid_expire) {
		const is_plan_expire = paid_plan !== 'free' && paid_expire < now_ms()

		return is_plan_expire || is_day_overflow
	} else {
		return is_day_overflow
	}
}
