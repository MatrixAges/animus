import { $ } from '@website/utils'

import type { IPropsPagination } from '../types'

const Index = (props: IPropsPagination) => {
	const {} = props

	return <div className='pagination_wrap'></div>
}

export default $.memo(Index)
