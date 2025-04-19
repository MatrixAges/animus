import { DocContentPage } from '@website/components'
import NotFound from '@website/public/svgs/404.inline.svg'
import { $ } from '@website/utils'
import getMd from '@website/utils/getMd'

import styles from './index.module.css'

interface IProps {
	params: Promise<{ id: string }>
}

const Index = async ({ params }: IProps) => {
	const id = (await params).id
	const { err, md, toc } = await getMd('blog', id, true)

	if (err) {
		return (
			<div className={$.cx('w_100 h_100vh flex justify_center align_center', styles.not_found)}>
				<div className='icon_wrap flex'>
					<NotFound></NotFound>
				</div>
			</div>
		)
	}

	return (
		<div className={$.cx('w_100', styles._local)}>
			<DocContentPage md={md} toc={toc}></DocContentPage>
		</div>
	)
}

export default Index
