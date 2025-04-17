import cx from 'classix'

import { landing_blog } from '@website/appdata/blog'
import { Blog, Landing } from '@website/appwidgets/index'
import getMd from '@website/utils/getMd'

import styles from './index.module.css'

const Index = async () => {
	const blog = await getMd('blog', landing_blog)

	return (
		<div className={cx('w_100 flex flex_column', styles._local)}>
			<Landing></Landing>
			<Blog content={blog}></Blog>
		</div>
	)
}

export default Index
