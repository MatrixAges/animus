import type { App, RxDB } from '@/types'
import type { MessageInstance } from 'antd/es/message/interface'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'
import type { NotificationInstance } from 'antd/es/notification/interface'
import type { TFunction } from 'i18next'
import type { memo } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import type Emittery from 'stk/emittery'
import type { handle } from 'stk/react'

type $CX = (...args: Array<string | boolean | null | undefined>) => string
type $Copy = <T>(input: T) => T

interface $App {
	memo: typeof memo
	handle: typeof handle
	Event: Emittery
}

declare global {
	interface Window {
		$is_dev: boolean
		$is_prod: boolean

		$stack_offs: Map<string, Set<() => void>>

		$t: TFunction<'translation', undefined>
		$copy: $Copy
		$cx: $CX
		$navigate: NavigateFunction

		$app: $App
		$db: RxDB.DBContent
		$message: MessageInstance
		$notification: NotificationInstance
		$modal: Omit<ModalStaticFunctions, 'warn'>
	}

	let $stack_offs: Map<string, Set<() => void>>
	let $is_dev: boolean
	let $is_prod: boolean

	let $t: TFunction<'translation', undefined>
	let $copy: $Copy
	let $cx: $CX
	let $navigate: NavigateFunction

	let $app: $App
	let $db: RxDB.DBContent
	let $message: MessageInstance
	let $notification: NotificationInstance
	let $modal: Omit<ModalStaticFunctions, 'warn'>
}

export {}
