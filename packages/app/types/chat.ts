export namespace Chat {
	export type Options = {
		prompt_rewriting: boolean
		newline_by_enter: boolean
		web_search_enabled: boolean
		web_search_engine: string
		temperature: number
		top_p: number
		max_ouput_tokens: number
		model: string
		question: string
		name: string
	}
}
