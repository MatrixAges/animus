import { ipcLink } from 'electron-trpc/renderer'

import { createTRPCClient } from '@trpc/client'

import type { Router } from '@desktop/rpcs'

export default createTRPCClient<Router>({
	// @ts-ignore
	links: globalThis.electronTRPC ? [ipcLink()] : []
})
