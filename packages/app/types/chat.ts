export namespace Chat {
	export type Options = {
		system_prompt: string
		prompt_rewriting: boolean
		newline_by_enter: boolean
		web_search_enabled: boolean
		web_search_engine: string
		temperature: number
		top_p: number
		max_ouput_tokens: number
		question: string
		name: string
		model: { provider: string; group: string; label: string; value: string }
	}
}
