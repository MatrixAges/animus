'use client'

import { useInViewport, useMemoizedFn } from 'ahooks'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { Play } from '@phosphor-icons/react'
import { $ } from '@website/utils'

import styles from './index.module.css'

import type { MediaHTMLAttributes, VideoHTMLAttributes } from 'react'

interface IProps extends MediaHTMLAttributes<HTMLVideoElement>, VideoHTMLAttributes<HTMLVideoElement> {
	type?: string | undefined
}

const Index = (props: IProps) => {
	const { src, type, ...rest_props } = props
	const ref = useRef<HTMLVideoElement>(null)
	const [can_play, setCanPlay] = useState(false)
	const [played, setPlayed] = useState(false)
	const [visible] = useInViewport(ref)

	const CanPlay = useMemoizedFn(() => setCanPlay(true))
	const Played = useMemoizedFn(() => setPlayed(true))

	useLayoutEffect(() => {
		const video = ref.current

		if (!video) return

		video.addEventListener('canplay', CanPlay)
		video.addEventListener('playing', Played)

		video.load()

		return () => {
			video.removeEventListener('canplay', CanPlay)
			video.removeEventListener('playing', Played)
		}
	}, [])

	useEffect(() => {
		const video = ref.current

		if (!video) return
		if (visible) return
		if (video.paused) return
		if (document.pictureInPictureElement === video) return

		video.pause()
	}, [visible])

	const play = useMemoizedFn(() => ref.current?.play())

	return (
		<div className={$.cx('w_100 relative', styles.wrap)}>
			{!played && (
				<div
					className={$.cx(
						'w_100 h_100 absolute top_0 left_0 flex justify_center align_center',
						styles.cover,
						!can_play && styles.disabled
					)}
					onClick={play}
				>
					<div className='btn_play flex justify_center align_center clickable'>
						<Play size={30} weight='fill'></Play>
					</div>
				</div>
			)}
			<video
				className={$.cx('w_100', styles._local, !played && styles.unplayed)}
				width='100%'
				ref={ref}
				controls={played}
				{...rest_props}
			>
				<source src={src as string} type={type} />
			</video>
		</div>
	)
}

export default $.memo(Index)
