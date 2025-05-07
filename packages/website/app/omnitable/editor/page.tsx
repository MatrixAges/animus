import Omnitable from '@website/components/Omnitable'
import config from '@website/components/Omnitable/config_editor'

const Index = () => {
	return (
		<div className='table_example_wrap'>
			<Omnitable {...config}></Omnitable>
		</div>
	)
}

export default Index
