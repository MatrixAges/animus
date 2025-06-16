import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Layout from '../layout'

const getComponent = (path: string) => lazy(() => import(`../pages/${path}/page`))

export default createBrowserRouter([
	{
		path: '/',
		Component: Layout
	}
])
