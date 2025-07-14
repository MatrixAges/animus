import { observer } from 'mobx-react-lite'

import { IconPicker } from '@/components'

const Index = () => {
	return (
		<div className='w_100 h_100 flex justify_center align_center'>
			<IconPicker>
				<button>icon picker</button>
			</IconPicker>
		</div>
	)
}

export default new $app.handle(Index).by(observer).by($app.memo).get()
