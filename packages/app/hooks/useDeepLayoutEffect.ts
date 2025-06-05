import { useLayoutEffect } from 'react'
import { createDeepCompareEffect } from 'stk/react'

// @ts-ignore
export default createDeepCompareEffect(useLayoutEffect)
