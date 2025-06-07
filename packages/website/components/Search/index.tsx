'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import {
	useAsyncEffect,
	useEventListener,
	useFocusWithin,
	useLocalStorageState,
	useMemoizedFn,
	useUpdateEffect
} from 'ahooks'
import { debounce, groupBy } from 'es-toolkit'
import db from 'localforage'
import { decompressFromUTF16 } from 'lz-string'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import { useRouter } from '@bprogress/next/app'
import {
	ArrowBendDownLeftIcon,
	ArrowDownIcon,
	ArrowUpIcon,
	MagnifyingGlassIcon,
	TrashIcon,
	XIcon
} from '@phosphor-icons/react'
import { Loading, LoadingCircle, SimpleEmpty } from '@website/components'
import { useLocale, useRouterHash } from '@website/hooks'
import { $ } from '@website/utils'
import { getPublic } from '@website/utils/ofetch'

import Group from './Group'

import styles from './index.module.css'

import type { Document as FlexDocument } from 'flexsearch'
import type { KeyboardEvent, MouseEvent } from 'react'

export interface IndexItem {
	id: string
	link: string
	type: 'heading' | 'content'
	headings: string
	content: string
}

export type Items = Record<string, Array<IndexItem>>

interface IProps {
	closeSearch: () => void
}

const Index = (props: IProps) => {
	const { closeSearch } = props
	const t = useTranslations('document')
	const pathname = usePathname()
	const { locale } = useLocale()
	const ref = useRef<HTMLInputElement>(null)
	const focusing = useFocusWithin(ref)
	const [loading_index, setLoadingIndex] = useState(false)
	const [loading_items, setLoadingItems] = useState(false)
	const [compositing, setCompositing] = useState(false)
	const [text, setText] = useState('')
	const [current, setCurrent] = useState<{ link: string; index: number | null }>({ link: '', index: null })
	const [items, setItems] = useState<Items>({})
	const [_history, setHistory] = useLocalStorageState<Array<string>>('search_history', {
		defaultValue: []
	})
	const hash = useRouterHash()
	const router = useRouter()
	const history = _history!

	useUpdateEffect(() => {
		closeSearch()
	}, [pathname, hash])

	const setSearchIndex = useMemoizedFn((search_index: FlexDocument, v: string) => {
		const local_index = JSON.parse(decompressFromUTF16(v))

		Object.keys(local_index).forEach(key => {
			search_index.import(key, local_index[key])
		})

		window.__search_index__ = search_index
	})

	useAsyncEffect(async () => {
		if (!locale || window.__search_index__) return

		setLoadingIndex(true)

		const [Document, timestamp, local_timestamp] = await Promise.all([
			import('flexsearch').then(res => res.default.Document),
			getPublic(`/search/timestamp`, { parseResponse: txt => txt }),
			db.getItem(`search_index_timestamp_${locale}`)
		])

		const search_index = new Document({
			cache: 100,
			tokenize: 'full',
			document: {
				id: 'id',
				index: 'content',
				store: true
			},
			context: {
				resolution: 9,
				depth: 3,
				bidirectional: true
			}
		})

		if (local_timestamp === timestamp) {
			const local_index_string = await db.getItem(`search_index_${locale}`)

			if (local_index_string) {
				setSearchIndex(search_index, local_index_string as string)

				return setLoadingIndex(false)
			}
		}

		const index_string = await getPublic(`/search/${locale}`, { parseResponse: txt => txt })

		setSearchIndex(search_index, index_string)
		setLoadingIndex(false)

		await db.setItem(`search_index_timestamp_${locale}`, timestamp)
		await db.setItem(`search_index_${locale}`, index_string)
	}, [locale])

	const searchByInput = useMemoizedFn(async v => {
		setLoadingItems(true)

		const index = window.__search_index__
		const res = (await index.searchAsync(v, { enrich: true })) as Array<{
			field?: string
			tag?: string
			result: Array<{
				id: string
				doc: {
					id: string
					link: string
					type: 'heading' | 'content'
					headings: string
					content: string
				}
				highlight?: string
			}>
		}>

		setLoadingItems(false)

		const result = res?.[0]?.result

		if (!result || !result.length) {
			return setItems({})
		}

		const items = result.map(item => item.doc)

		setItems(groupBy(items, item => item.link) as unknown as Items)
		addHistory(v)
	})

	useEventListener('compositionstart', () => setCompositing(true), { target: ref })

	useEventListener(
		'compositionend',
		() => {
			setCompositing(false)
			searchByInput(ref.current?.value!)
			setText(ref.current?.value!)
		},
		{ target: ref }
	)

	const handleChangeIndex = useMemoizedFn(e => {
		const event = e as KeyboardEvent

		if (event.key === 'Enter') {
			event.preventDefault()

			const target = items[current.link]

			if (!target) return

			if (current.index === null) {
				return router.push(`/docs/${current.link}`)
			}

			const item = target[current.index]

			return router.push(`/docs/${current.link}#${item.headings.split('>').at(-1)}`)
		}

		if (event.key === 'Escape') {
			event.preventDefault()
			closeSearch()

			return
		}

		const keys = Object.keys(items)

		if (!keys.length) return

		if (current.link === '' && current.index === null) {
			setCurrent({
				link: Object.keys(items)[0],
				index: null
			})
		}

		if (event.key === 'ArrowUpIcon') {
			event.preventDefault()

			if (current.index === null) {
				const group_index = keys.findIndex(i => i === current.link)

				if (group_index === 0) return

				const prev_group_key = keys[group_index - 1]

				return setCurrent({
					link: prev_group_key,
					index: items[prev_group_key].length - 1
				})
			} else {
				if (current.index === 0) {
					return setCurrent({
						link: current.link,
						index: null
					})
				}

				return setCurrent({
					link: current.link,
					index: current.index - 1
				})
			}
		}

		if (event.key === 'ArrowDownIcon') {
			event.preventDefault()

			if (current.index === null) {
				return setCurrent({
					link: current.link,
					index: 0
				})
			} else {
				if (current.index === items[current.link].length - 1) {
					const group_index = keys.findIndex(i => i === current.link)

					if (group_index === keys.length - 1) return

					const next_group_key = keys[group_index + 1]

					return setCurrent({
						link: next_group_key,
						index: null
					})
				}

				return setCurrent({
					link: current.link,
					index: current.index + 1
				})
			}
		}
	})

	useEffect(() => {
		if (!open) return

		document.addEventListener('keydown', handleChangeIndex)

		return () => document.removeEventListener('keydown', handleChangeIndex)
	}, [open])

	const onInput = useMemoizedFn(
		debounce(({ target: { value } }) => {
			if (compositing) return

			searchByInput(value)
			setText(value)
		}, 600)
	)

	const clear = useMemoizedFn(() => {
		ref.current!.value = ''

		searchByInput('')
		setText('')
	})

	const onSearchItem = useMemoizedFn((e: MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement
		const text = target.getAttribute('data-text')

		if (!text) return

		ref.current!.value = text

		searchByInput(text)
		setText(text)
	})

	const addHistory = useMemoizedFn((text: string) => {
		if (history.includes(text)) return

		history.unshift(text)

		if (history.length > 15) {
			history!.pop()
		}

		setHistory(history)
	})

	const clearHistory = useMemoizedFn(() => setHistory([]))

	return (
		<div className={$.cx('flex flex_column relative', styles._local)}>
			{loading_index && (
				<div className='loading_wrap absolute w_100 h_100 flex flex_column justify_center align_center'>
					<Loading size={66}></Loading>
					<span>{t('search.loading_index')}</span>
				</div>
			)}
			<div className='flex flex_column'>
				<div className='input_wrap w_100 relative flex align_center'>
					<MagnifyingGlassIcon
						className={$.cx('icon_search absolute transition_normal', focusing && 'focusing')}
						size={18}
					></MagnifyingGlassIcon>
					<input
						type='text'
						className='input_search w_100 border_box'
						placeholder={t('search.placeholder')}
						autoFocus
						maxLength={30}
						ref={ref}
						onInput={onInput}
					/>
					{text && (
						<div
							className='btn_clear flex justify_center align_center absolute clickable'
							onClick={clear}
						>
							<XIcon size={15}></XIcon>
						</div>
					)}
				</div>
				<div className='search_items_wrap w_100 border_box flex flex_column relative'>
					{loading_items && (
						<div className='loading_wrap absolute left_0 w_100 h_100 flex flex_column justify_center align_center'>
							<LoadingCircle size={48}></LoadingCircle>
							<span className='mt_4'>{t('search.loading_items')}</span>
						</div>
					)}
					{Object.keys(items).length > 0 ? (
						<div className='search_items flex flex_column'>
							{Object.keys(items).map(link => (
								<Group
									link={link}
									items={items[link]}
									current={current}
									setCurrent={setCurrent}
									key={link}
								></Group>
							))}
						</div>
					) : (
						<Fragment>
							{history!.length > 0 && (
								<div className='search_history w_100 border_box flex flex_column'>
									<div className='search_history_header flex justify_between align_center'>
										<span className='title'>{t('search.history')}</span>
										<div
											className='btn_clear flex justify_center align_center clickable'
											onClick={clearHistory}
										>
											<TrashIcon size={14}></TrashIcon>
										</div>
									</div>
									<div className='flex flex_wrap' onClick={onSearchItem}>
										{history.map((item, index) => (
											<span
												className='search_history_item border_box mr_4 cursor_point clickable'
												data-text={item}
												key={index}
											>
												{item}
											</span>
										))}
									</div>
								</div>
							)}
							<SimpleEmpty style={{ height: 480 }}></SimpleEmpty>
						</Fragment>
					)}
				</div>
				<div className='hotkey_wrap w_100 border_box flex justify_between align_center'>
					<div className='flex align_center'>
						<div className='key_item flex align_center mr_18'>
							<div className='icon_key_wrap border_box flex justify_center align_center'>
								<ArrowUpIcon></ArrowUpIcon>
							</div>
							<div className='icon_key_wrap border_box flex justify_center align_center'>
								<ArrowDownIcon></ArrowDownIcon>
							</div>
							<span className='desc'>{t('search.to_navigate')}</span>
						</div>
						<div className='key_item flex align_center'>
							<div className='icon_key_wrap border_box flex justify_center align_center'>
								<ArrowBendDownLeftIcon></ArrowBendDownLeftIcon>
							</div>
							<span className='desc'>{t('search.to_select')}</span>
						</div>
					</div>
					<div className='flex align_center'>
						<div className='key_item flex align_center'>
							<div className='icon_key_wrap esc_wrap border_box flex justify_center align_center'>
								<span className='esc'>esc</span>
							</div>
							<span className='desc'>{t('search.to_close')}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default $.memo(Index)
