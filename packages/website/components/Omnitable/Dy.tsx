'use client'

import dynamic from 'next/dynamic'

// Mobx 在 Nextjs v15中需要采用动态导入，否则报错（需等待 react-mobx-lite 适配 Nextjs v15）

export default dynamic(() => import('./index'), { ssr: false })
