import { useState } from 'react'
import { useMutationObserver } from 'ahooks'

export default (name: string) => {
	const [css_var, setCssVar] = useState(getComputedStyle(document.documentElement).getPropertyValue(name))

	useMutationObserver(
		list => {
			for (const mutation of list) {
				if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
					setCssVar(getComputedStyle(document.documentElement).getPropertyValue(name))
				}
			}
		},
		document.documentElement,
		{ attributes: true }
	)

	return css_var
}
