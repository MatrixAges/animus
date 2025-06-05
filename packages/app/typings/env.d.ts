declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PUBLIC_CUBE_API_URL: string
			PUBLIC_CUBE_API_TOKEN: string
		}
	}
}

export {}
