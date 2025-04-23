import { Dropdown } from 'antd'
import { Ellipsis } from 'lucide-react'

import { Eye, PencilSimple, Trash } from '@phosphor-icons/react'
import { $ } from '@website/utils'

import styles from './index.module.css'

import type { Omnitable, ComponentType } from '../../types'
import type { MenuProps } from 'antd'

const items: MenuProps['items'] = [
	{
		key: 'view',
		label: 'View',
		icon: <Eye size={16}></Eye>
	},
	{
		key: 'edit',
		label: 'Edit',
		icon: <PencilSimple size={16}></PencilSimple>
	},
	{
		type: 'divider'
	},
	{
		key: 'delete',
		label: 'Delete',
		icon: <Trash size={16}></Trash>
	}
]

const Index = (props: ComponentType<Omnitable.Operation['props']>) => {
	const { editing, onFocus, onChange } = props

	const Btn = (
		<div className='btn_wrap flex justify_center align_center clickable'>
			<Ellipsis size={16} strokeWidth={2} strokeLinecap='round'></Ellipsis>
		</div>
	)

	return (
		<button className={$.cx(styles._local)} onFocus={onFocus}>
			{editing ? (
				<Dropdown
					rootClassName={styles.dropdown}
					trigger={['click']}
					destroyPopupOnHide
					menu={{ items, onFocus }}
				>
					<div>{Btn}</div>
				</Dropdown>
			) : (
				Btn
			)}
		</button>
	)
}

export default $.memo(Index)
