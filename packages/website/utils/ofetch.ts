import { ofetch } from 'ofetch'

import { base_url, is_dev } from '@website/utils/const'

export const getPublic = ofetch.create({
	baseURL: is_dev ? 'http://localhost:3000' : base_url
})

export const stream = ofetch.create({
	responseType: 'stream'
})
