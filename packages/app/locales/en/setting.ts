export default {
	providers: {
		title: 'Providers',
		links: {
			website: 'Website',
			doc: 'Doc',
			model_spec: 'Models',
			api_key: 'Get API Key'
		},
		api_base_url: 'API Base URL',
		api_base_url_placeholder: 'Enter the API base url provided by the provider',
		api_key: 'API Key',
		api_key_placeholder: 'Please obtain and enter the API key before use',
		features: {
			function_calling: 'Function Calling',
			structured_output: 'Structured Output',
			reasoning: 'Reasoning',
			reasoning_optional: 'Reasoning Optional',
			web_search: 'Web Search',
			image_input: 'Image Input',
			image_output: 'Image Output',
			embedding: 'Embedding',
			reranking: 'Reranking'
		}
	},
	general: {
		title: 'General',
		normal: {
			title: 'Preferences',
			language: {
				title: 'Language',
				desc: 'Languages used by application'
			},
			theme: {
				title: 'Theme',
				desc: 'App theme color, component color',
				options: {
					light: 'Light',
					dark: 'Dark',
					system: 'System'
				},
				auto_theme: 'Auto theme, light theme from 6AM to 6PM, dark theme the rest of time'
			},
			glass: {
				title: 'Glass Window',
				desc: 'Transparent window with glass effect after enabled'
			},
			cache: {
				title: 'Cache',
				clear: 'Clear Cache',
				desc: `Clearing the application's cache setting`
			}
		},
		update: {
			title: 'Version Update',
			subtitle: 'Update',
			desc: 'Current version',
			btn_update: 'Check update',
			btn_download: 'Download',
			no_update: 'The latest version of IF is currently in use',
			has_update: 'New version detected',
			downloading: 'Downloading new version',
			downloaded: 'Content has been downloaded, restart to install',
			btn_install: 'Install',
			install_backup: 'Please back up before updating'
		}
	},
	shortcuts: {
		title: 'Shortcuts',
		'app.toggleSetting': 'Toggle Setting Panel',
		'app.toggleSidebar': 'Toggle Sidebar',
		'app.openSearch': 'Open Search Panel',
		'app.closeSearch': 'Close Search Panel',
		keydown: 'Key Down',
		keyup: 'Key Up'
	},
	about: {
		title: 'About',
		media: {
			website: 'Website',
			github: 'Github',
			license: 'License'
		},
		words: 'The soul becomes wise when it learns to know itself',
		person: 'Pythagoras'
	},
	note: {
		toc: {
			title: 'Show Table of Contents',
			desc: 'Overview of article structure'
		},
		show_heading_text: {
			title: 'Show Heading Level',
			desc: 'Show heading level on the left side of the heading'
		},
		serif: {
			title: 'Serif',
			desc: 'Readability, professionalism, and recognizability'
		},
		small_text: {
			title: 'Small Text',
			desc: 'Optimal size for more content'
		},
		count: {
			title: 'Word Count',
			desc: 'Count the total number of words, excluding spaces'
		}
	}
}
