import { Hono } from 'hono'

import init from './init'

export default new Hono().post('/init', init.validator, init.handler)
