import { string } from 'zod'

import { ChatEventStore, p } from '@desktop/utils'

export const updateOptions = p.input(string()).mutation(async ({ input }) => {
	ChatEventStore.emit(`${input}/UPDATE_OPTIONS`)
})

export const destroy = p.input(string()).mutation(async ({ input }) => {
	ChatEventStore.emit(`${input}/DESTROY`)
})
