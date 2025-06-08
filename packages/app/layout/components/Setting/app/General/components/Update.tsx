import { Fragment } from 'react'
import { useMemoizedFn } from 'ahooks'
import { Progress } from 'antd'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { version } from '@/appdata'
import { useGlobal } from '@/context'
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
				<div className='setting_item password_item w_100 border_box flex flex_column'>
					<div className='setting_content w_100 border_box flex justify_between align_center'>
						<div className='title_wrap flex align_center'>
							<BoxArrowUpIcon size={24}></BoxArrowUpIcon>
							<div className='text_wrap flex flex_column'>
								<span className='title'>{t('setting.general.update.subtitle')}</span>
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
										<span className='desc'>
											{t('setting.general.update.downloading')}
										</span>
									</When>
									<When condition={update_status?.type === 'downloaded'}>
										<span className='desc'>
											{t('setting.general.update.downloaded')}
										</span>
									</When>
								</Choose>
							</div>
						</div>
						<div className='value_wrap flex align_center'>
							<Choose>
								<When condition={update_status === null}>
									<button
										className='btn flex justify_center align_center clickable'
										onClick={checkUpdate}
									>
										{t('setting.general.update.btn_update')}
									</button>
								</When>
								<When condition={update_status?.type === 'has_update'}>
									<button
										className='btn flex justify_center align_center clickable'
										onClick={app.download}
									>
										{t('setting.general.update.btn_download')}
									</button>
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
									<button
										className='btn flex justify_center align_center clickable'
										onClick={app.install}
									>
										{t('setting.general.update.btn_install')}
									</button>
								</When>
							</Choose>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
