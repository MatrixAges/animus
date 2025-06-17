import '@/styles/index.css'
import '@/theme/custom/antd.css'
import '@abraham/reflection'
import '@ant-design/v5-patch-for-react-19'
import '@/global'
import '@/presets'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import router from './router'

createRoot(document.getElementById('root')!).render(<RouterProvider router={router}></RouterProvider>)
