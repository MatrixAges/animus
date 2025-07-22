import { providers } from 'fst/llm'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { toJSONSchema } from 'zod'

import { useGlobal } from '@/context'

import { SchemaRender } from './components'

import styles from './index.module.css'

import type { JSONSchema7 } from 'json-schema'

const Index = () => {
	const global = useGlobal()
	const { t } = useTranslation()

	return (
		<div className={$cx('w_100 flex flex_column', styles._local)}>
			<span className='setting_title'>{t('setting.providers.title')}</span>
			<div className='provider_items w_100 border_box flex flex_column'>
				<SchemaRender
					root_name='Anthropic'
					schema={
						toJSONSchema(providers.anthropic.schema, {
							target: 'draft-7',
							unrepresentable: 'any'
						}) as JSONSchema7
					}
				></SchemaRender>
			</div>
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
