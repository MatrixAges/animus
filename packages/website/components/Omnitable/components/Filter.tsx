import { $ } from '@website/utils'

import type { IPropsFilter } from '../types'

const Index = (props: IPropsFilter) => {
	const {} = props

	return <div className='pagination_wrap'></div>
}

export default $.memo(Index)
