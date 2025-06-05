import '@website/global_css'

import { Fragment } from 'react'
import { App } from 'antd'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Script from 'next/script'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { GoogleAnalytics } from '@next/third-parties/google'
import { description, name, slogan } from '@website/appdata'
import { Client } from '@website/appwidgets/layout'
import { ConfigProvider } from '@website/components'
import { getUserLocale, getUserTheme } from '@website/services'

import type { IPropsClient } from '@website/appwidgets/layout/Client'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

const Index = async (props: PropsWithChildren) => {
	const { children } = props

	const messages = await getMessages()
	const { locale, cookie: locale_cookie_exsit } = await getUserLocale()
	const { theme, cookie: theme_cookie_exsit } = await getUserTheme()

	const props_client: IPropsClient = {
		locale,
		locale_cookie_exsit,
		theme,
		theme_cookie_exsit
	}

	return (
		<html lang={locale} data-theme={theme} style={{ colorScheme: theme }} suppressHydrationWarning>
			<head>
				<meta charSet='UTF-8' />

				<meta name='keywords' content='ai'></meta>
				<meta name='keywords' content='llm'></meta>
				<meta name='keywords' content='chatbot'></meta>
				<meta name='keywords' content='openai'></meta>
				<meta name='keywords' content='rag'></meta>
				<meta name='keywords' content='mcp'></meta>
				<meta name='keywords' content='deep research'></meta>
				<meta name='keywords' content='knowledge base'></meta>

				<link id='favicon' rel='icon' type='image/svg+xml' href='/logo_with_bg.svg' />
				<link rel='stylesheet' href='/styles/init.css' />
				<link rel='stylesheet' href='/styles/atom.min.css' />
				<link rel='stylesheet' href='/icon_font.css' />
				<link rel='stylesheet' href='/theme/common.css' />
				<link rel='stylesheet' href='/theme/light.css' />
				<link rel='stylesheet' href='/theme/dark.css' />
			</head>
			<body>
				<NextIntlClientProvider messages={messages}>
					<AntdRegistry>
						<ConfigProvider locale={locale} theme={theme}>
							<App prefixCls='ani'>
								<Client {...props_client}>{children}</Client>
							</App>
						</ConfigProvider>
					</AntdRegistry>
				</NextIntlClientProvider>

				{process.env.NODE_ENV === 'production' && (
					<Fragment>
						<GoogleAnalytics gaId='G-ZGP5C11X9E' />
						<Script id='clarity-script' strategy='afterInteractive'>
							{`
                                                (function(c,l,a,r,i,t,y){
                                                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                                                })(window, document, "clarity", "script", "r5h70hisx8");
                                          `}
						</Script>
					</Fragment>
				)}
			</body>
		</html>
	)
}

export const metadata: Metadata = {
	title: `${name} - ${slogan}.`,
	description: `${description}.`
}

// edge for cloudflare
export const runtime = 'edge'

export default Index
