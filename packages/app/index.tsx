import '@abraham/reflection'
import '@ant-design/v5-patch-for-react-19'
import '@/presets'
import '@/global'
import '@/styles/index.css'
import '@/theme/custom/antd.css'

import { createRoot } from 'react-dom/client'

import Layout from '@/layout'

createRoot(document.getElementById('root')!).render(<Layout></Layout>)
