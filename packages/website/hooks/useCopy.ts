import { useMemoizedFn } from 'ahooks'
import { message as ms } from 'antd'
import { useTranslations } from 'next-intl'

const { useMessage } = ms

export default (text: string) => {
	const t = useTranslations('global')
	const [message, context] = useMessage()

	const copy = useMemoizedFn(async () => {
		await window.navigator.clipboard.writeText(text)

		message.success(t('copied'))
	})

	return { context, copy }
}
