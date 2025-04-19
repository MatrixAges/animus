'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default () => {
	const searchParams = useSearchParams()
	const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash.slice(1) : null)

	useEffect(() => {
		setHash(typeof window !== 'undefined' ? window.location.hash.slice(1) : null)
	}, [searchParams])

	return hash
}
