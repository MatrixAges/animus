import { Fragment } from 'react'
import { useMemoizedFn } from 'ahooks'
import { Button, Progress } from 'antd'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { version } from '@/appdata'
import { useGlobal } from '@/context'
import { Item } from '@/layout/components/Setting/components'
import { BoxArrowUpIcon } from '@phosphor-icons/react'

import type { Downloading, HasUpdate } from '@/types'

const Index = () => {
	const global = useGlobal()
	const { t } = useTranslation()
	const app = global.app
	const update_status = app.update_status

	const checkUpdate = useMemoizedFn(() => app.checkUpdate())

	return (
		<Fragment>
			<span className='setting_title'>{t('setting.general.update.title')}</span>
			<div className='setting_items screenlock_wrap w_100 border_box flex flex_column'>
				<Item
					Icon={BoxArrowUpIcon}
					title={t('setting.general.update.subtitle')}
					desc={
						<Choose>
							<When condition={update_status === null}>
								<span className='desc'>
									{t('setting.general.update.desc')} : {version}
								</span>
							</When>
							<When condition={update_status?.type === 'has_update'}>
								<span className='desc'>
									{t('setting.general.update.has_update')} :
									{(update_status as HasUpdate).version}
								</span>
							</When>
							<When condition={update_status?.type === 'downloading'}>
								<span className='desc'>{t('setting.general.update.downloading')}</span>
							</When>
							<When condition={update_status?.type === 'downloaded'}>
								<span className='desc'>{t('setting.general.update.downloaded')}</span>
							</When>
						</Choose>
					}
				>
					<Choose>
						<When condition={update_status === null}>
							<Button
								className='btn flex justify_center align_center clickable'
								onClick={checkUpdate}
							>
								{t('setting.general.update.btn_update')}
							</Button>
						</When>
						<When condition={update_status?.type === 'has_update'}>
							<Button
								className='btn flex justify_center align_center clickable'
								onClick={app.download}
							>
								{t('setting.general.update.btn_download')}
							</Button>
						</When>
						<When condition={update_status?.type === 'downloading'}>
							<Progress
								className='progress_circle'
								type='circle'
								strokeColor='var(--color_success)'
								size={36}
								percent={(update_status as Downloading).percent}
							></Progress>
						</When>
						<When condition={update_status?.type === 'downloaded'}>
							<Button
								className='btn flex justify_center align_center clickable'
								onClick={app.install}
							>
								{t('setting.general.update.btn_install')}
							</Button>
						</When>
					</Choose>
				</Item>
			</div>
		</Fragment>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
