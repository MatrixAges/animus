import Markdown from 'react-markdown'

import { $ } from '@website/utils'

import styles from './index.module.css'

interface IProps {
	md: string
}

const Index = (props: IProps) => {
	const { md } = props

	return (
		<article className={$.cx(styles._local)}>
			<Markdown>{md}</Markdown>
		</article>
	)
}

export default $.memo(Index)
