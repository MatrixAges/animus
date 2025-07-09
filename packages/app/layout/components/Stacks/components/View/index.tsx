import { useMemoizedFn } from 'ahooks'

import { LazyModule, LazyPage } from '@/components'
import { StackContext } from '@/context/stack'

import styles from './index.module.css'

import type { IPropsStacksView } from '@/layout'

const Index = (props: IPropsStacksView) => {
	const { column_index, view_index, type, module, id, filename, width, container_width, create, click } = props

	const onMouseDown = useMemoizedFn(() => click({ column: column_index, view: view_index }, true))

	return (
		<StackContext.Provider value={{ module, id, width, container_width }}>
			<div className={$cx('w_100 h_100 relative', styles.position_wrap)} onMouseDown={onMouseDown}>
				<div id={id} className={$cx('__view_container w_100 h_100', styles._local)}>
					<Choose>
						<When condition={type === 'page'}>
							<LazyPage module={module} />
						</When>
						<Otherwise>
							<LazyModule module={module} props={{ id, filename, create }}></LazyModule>
						</Otherwise>
					</Choose>
				</div>
			</div>
		</StackContext.Provider>
	)
}

export default $app.memo(Index)
