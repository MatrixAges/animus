import { useTranslation } from 'react-i18next'

import { email } from '@/appdata'
import { getVersion } from '@/appdata/version'
import { Logo } from '@/components'
import { EnvelopeSimpleIcon } from '@phosphor-icons/react'

import styles from './index.module.css'

const Index = () => {
	const { t } = useTranslation()

	return (
		<div className={$cx('w_100 h_100 flex flex_column align_center justify_center relative', styles._local)}>
			<Logo size={120}></Logo>
			<span className='version color_text_light mb_6'>{getVersion()}</span>
			<div className='media_wrap flex'>
				<a className='media_item' href='https://getanimus.ai'>
					{t('setting.about.media.website')}
				</a>
				<a className='media_item' href='https://github.com/connectionsai/animus'>
					{t('setting.about.media.github')}
				</a>
				<a className='media_item' href='https://github.com/connectionsai/animus/blob/master/LICENSE'>
					{t('setting.about.media.license')}
				</a>
			</div>
			<div className='statement flex flex_column align_center'>
				<span className='words text_center'>{t('setting.about.words')}</span>
				<span className='person'>{t('setting.about.person')}</span>
			</div>
			<div className='link_wrap flex absolute'>
				<a className='link_item flex align_center' href={`mailto:${email}`}>
					<EnvelopeSimpleIcon className='mr_4'></EnvelopeSimpleIcon> {email}
				</a>
			</div>
		</div>
	)
}

export default $app.memo(Index)
