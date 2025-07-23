import { Fragment, useMemo } from 'react'
import { useToggle } from 'ahooks'
import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { Icon, Modal } from '@/components'
import { useGlobal } from '@/context'
import { CaretUpDownIcon, CheckIcon, PencilSimpleIcon } from '@phosphor-icons/react'

import { EditPanel } from './components'

import styles from './index.module.css'

import type { Workspace } from '@/types'

const Index = () => {
	const global = useGlobal()
	const [open, { toggle }] = useToggle()
	const { t } = useTranslation()

	const app = global.app
	const workspaces = $copy(app.workspaces)
	const workspace = app.workspace

	const { options, target } = useMemo(() => {
		let target = null as unknown as Workspace

		const options = workspaces.map(item => {
			if (item.name === workspace) target = item

			return {
				key: item.name,
				label: (
					<div className='workspace_item flex justify_between align_center'>
						<div className='left_wrap flex align_center'>
							<div className='icon_wrap flex'>
								<Icon id={item.icon} icon_type={item.icon_type}></Icon>
							</div>
							<span className='name line_clamp_1'>{item.name}</span>
						</div>
						<If condition={item.name === workspace}>
							<CheckIcon size={15}></CheckIcon>
						</If>
					</div>
				)
			}
		})

		return { options, target }
	}, [workspaces, workspace])

	return (
		<Fragment>
			<div className={$cx(styles._local, 'w_100 border_box absolute bottom_0')}>
				<Select
					className='w_100'
					classNames={{ popup: { root: styles.popup } }}
					placement='topLeft'
					options={options}
					value={workspace}
					suffixIcon={
						<Fragment>
							<CaretUpDownIcon className='suffix_icon toggle_icon' size={16} />
							<PencilSimpleIcon
								className='suffix_icon btn_edit clickable'
								size={16}
								onClick={toggle}
							/>
						</Fragment>
					}
					labelRender={() => (
						<div className='target_wrap flex'>
							<div className='icon_wrap flex justify_center align_center'>
								<Icon id={target.icon} icon_type={target.icon_type}></Icon>
							</div>
							<div className='right_wrap flex flex_column'>
								<span className='name w_100 line_clamp_1'>{target.name}</span>
								<span className='desc'>{t('app.workspace.title')}</span>
							</div>
						</div>
					)}
				></Select>
			</div>
			<Modal
				className={styles.edit_wrap}
				title={t('app.workspace.title')}
				z_index={2000}
				global
				open={open}
				onClose={toggle}
			>
				<EditPanel onClose={toggle}></EditPanel>
			</Modal>
		</Fragment>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
