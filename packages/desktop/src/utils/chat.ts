import { EventEmitter } from 'events'

import { createResumableStreamContext } from '@desktop/utils'

import type Chat from 'fst/chat'

export const ChatStore = new Map<string, Chat>()
export const ChatStreamStore = createResumableStreamContext()
export const ChatEventStore = new EventEmitter()
