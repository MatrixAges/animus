import { createGoogleGenerativeAI } from '@ai-sdk/google'

import type { ProviderKey } from '@fst/llm'

interface Args {
	name: ProviderKey
	api_key: string
}

export const getProvider = (args: Args) => {
	const { name, api_key } = args

	switch (name) {
		case 'google_gemini':
			return createGoogleGenerativeAI({ apiKey: api_key })

		default:
			break
	}
}
