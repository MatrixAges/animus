export const getComputedStyleValue = (el: Element, property: string) => {
	return Number(getComputedStyle(el).getPropertyValue(property).replace('px', ''))
}

export const getJoinArray = <T>(arr: Array<T>, ...join: Array<any>) => {
	const target = [] as Array<T>

	arr.forEach((item, index) => {
		target.push(item)

		if (index < arr.length - 1) {
			target.push(...join)
		}
	})

	return target
}

export const getArray = (length: number) => Array.from({ length })

export const UpperFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
