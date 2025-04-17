import Link from 'next/link'

const Index = () => {
	return (
		<div
			className='h_100vh w_100vw top_0 left_0 flex flex_column align_center justify_center'
			style={{ zIndex: 100000 }}
		>
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<Link href='/'>Return Home</Link>
		</div>
	)
}

export default Index
