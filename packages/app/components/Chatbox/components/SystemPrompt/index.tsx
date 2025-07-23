import { useMemoizedFn, useToggle } from 'ahooks'
import { useTranslation } from 'react-i18next'
import { Fragment } from 'react/jsx-runtime'

import { Modal } from '@/components'
import { AnchorSimpleIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

import type { FocusEvent } from 'react'
import type { IPropsSystemPrompt } from '../../types'

const Index = (props: IPropsSystemPrompt) => {
	const { system_prompt, setSystemPrompt } = props
	const [open, { toggle }] = useToggle()
	const { t } = useTranslation()

	const onBlur = useMemoizedFn((e: FocusEvent<HTMLTextAreaElement>) => setSystemPrompt(e.target.value))

	return (
		<Fragment>
			<div className='option_item flex justify_center align_center clickit' onClick={toggle}>
				<AnchorSimpleIcon></AnchorSimpleIcon>
			</div>
			<Modal
				className={styles._local}
				title={t('chatbox.system_prompt.title')}
				width='min(90%,600px)'
				height='min(100%,600px)'
				open={open}
				onClose={toggle}
			>
				<textarea
					className='textarea w_100'
					placeholder={t('chatbox.system_prompt.desc')}
					defaultValue={system_prompt}
					onBlur={onBlur}
				></textarea>
			</Modal>
		</Fragment>
	)
}

export default $app.memo(Index)
