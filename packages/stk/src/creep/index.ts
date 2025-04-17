import getOfflineAudioContext from './audio'
import getCanvas2d from './canvas'
import getCSS from './css'
import getCSSMedia from './cssmedia'
import getHTMLElementVersion from './document'
import getClientRects from './domrect'
import getConsoleErrors from './engine'
import { getCapturedErrors, timer } from './errors'
import getEngineFeatures from './features'
import getFonts from './fonts'
import getHeadlessFeatures from './headless'
import getIntl from './intl'
import { getLies, PARENT_PHANTOM } from './lies'
import getMaths from './math'
import getMedia from './media'
import getNavigator from './navigator'
import getResistance from './resistance'
import getScreen from './screen'
import getVoices from './speech'
import { getStorage } from './status'
import getSVG from './svg'
import getTimezone from './timezone'
import { getTrash } from './trash'
import { hashify } from './utils/crypto'
import { braveBrowser, getBraveMode, getBraveUnprotectedParameters, queueTask, IS_BLINK } from './utils/helpers'
import getCanvasWebgl from './webgl'
import getWindowFeatures from './window'
import getBestWorkerScope, { spawnWorker, Scope } from './worker'

export const getCode = async () => {
	const scope = await spawnWorker()

	if (scope == Scope.WORKER) return

	await queueTask()

	const isBrave = IS_BLINK ? await braveBrowser() : false
	const braveMode = isBrave ? getBraveMode() : ({} as any)
	const braveFingerprintingBlocking = isBrave && (braveMode.standard || braveMode.strict)

	const getFingerprint = async () => {
		const timeStart = timer()
		const fingerprintTimeStart = timer()
		// @ts-ignore
		const [
			workerScopeComputed,
			voicesComputed,
			offlineAudioContextComputed,
			canvasWebglComputed,
			canvas2dComputed,
			windowFeaturesComputed,
			htmlElementVersionComputed,
			cssComputed,
			cssMediaComputed,
			screenComputed,
			mathsComputed,
			consoleErrorsComputed,
			timezoneComputed,
			clientRectsComputed,
			fontsComputed,
			mediaComputed,
			svgComputed,
			resistanceComputed,
			intlComputed
		] = await Promise.all([
			getBestWorkerScope(),
			getVoices(),
			getOfflineAudioContext(),
			getCanvasWebgl(),
			getCanvas2d(),
			getWindowFeatures(),
			getHTMLElementVersion(),
			getCSS(),
			getCSSMedia(),
			getScreen(),
			getMaths(),
			getConsoleErrors(),
			getTimezone(),
			getClientRects(),
			getFonts(),
			getMedia(),
			getSVG(),
			getResistance(),
			getIntl()
		]).catch(error => console.error(error.message))

		const navigatorComputed = await getNavigator(workerScopeComputed).catch(error =>
			console.error(error.message)
		)

		// @ts-ignore
		const [headlessComputed, featuresComputed] = await Promise.all([
			getHeadlessFeatures({
				webgl: canvasWebglComputed,
				workerScope: workerScopeComputed
			}),
			getEngineFeatures({
				cssComputed,
				navigatorComputed,
				windowFeaturesComputed
			})
		]).catch(error => console.error(error.message))

		// @ts-ignore
		const [liesComputed, trashComputed, capturedErrorsComputed] = await Promise.all([
			getLies(),
			getTrash(),
			getCapturedErrors()
		]).catch(error => console.error(error.message))

		const fingerprintTimeEnd = fingerprintTimeStart()
		console.log(`Fingerprinting complete in ${fingerprintTimeEnd.toFixed(2)}ms`)

		// GPU Prediction
		const { parameters: gpuParameter } = canvasWebglComputed || {}
		const reducedGPUParameters = {
			...(braveFingerprintingBlocking ? getBraveUnprotectedParameters(gpuParameter) : gpuParameter),
			RENDERER: undefined,
			SHADING_LANGUAGE_VERSION: undefined,
			UNMASKED_RENDERER_WEBGL: undefined,
			UNMASKED_VENDOR_WEBGL: undefined,
			VERSION: undefined,
			VENDOR: undefined
		}

		// Hashing
		const hashStartTime = timer()
		// @ts-ignore
		const [
			windowHash,
			headlessHash,
			htmlHash,
			cssMediaHash,
			cssHash,
			styleHash,
			styleSystemHash,
			screenHash,
			voicesHash,
			canvas2dHash,
			canvas2dImageHash,
			canvas2dPaintHash,
			canvas2dTextHash,
			canvas2dEmojiHash,
			canvasWebglHash,
			canvasWebglImageHash,
			canvasWebglParametersHash,
			pixelsHash,
			pixels2Hash,
			mathsHash,
			consoleErrorsHash,
			timezoneHash,
			rectsHash,
			domRectHash,
			audioHash,
			fontsHash,
			workerHash,
			mediaHash,
			mimeTypesHash,
			navigatorHash,
			liesHash,
			trashHash,
			errorsHash,
			svgHash,
			resistanceHash,
			intlHash,
			featuresHash,
			deviceOfTimezoneHash
		] = await Promise.all([
			hashify(windowFeaturesComputed),
			hashify(headlessComputed),
			hashify((htmlElementVersionComputed || {}).keys),
			hashify(cssMediaComputed),
			hashify(cssComputed),
			hashify((cssComputed || {}).computedStyle),
			hashify((cssComputed || {}).system),
			hashify(screenComputed),
			hashify(voicesComputed),
			hashify(canvas2dComputed),
			hashify((canvas2dComputed || {}).dataURI),
			hashify((canvas2dComputed || {}).paintURI),
			hashify((canvas2dComputed || {}).textURI),
			hashify((canvas2dComputed || {}).emojiURI),
			hashify(canvasWebglComputed),
			hashify((canvasWebglComputed || {}).dataURI),
			hashify(reducedGPUParameters),
			((canvasWebglComputed || {}).pixels || []).length ? hashify(canvasWebglComputed.pixels) : undefined,
			((canvasWebglComputed || {}).pixels2 || []).length ? hashify(canvasWebglComputed.pixels2) : undefined,
			hashify((mathsComputed || {}).data),
			hashify((consoleErrorsComputed || {}).errors),
			hashify(timezoneComputed),
			hashify(clientRectsComputed),
			hashify([
				(clientRectsComputed || {}).elementBoundingClientRect,
				(clientRectsComputed || {}).elementClientRects,
				(clientRectsComputed || {}).rangeBoundingClientRect,
				(clientRectsComputed || {}).rangeClientRects
			]),
			hashify(offlineAudioContextComputed),
			hashify(fontsComputed),
			hashify(workerScopeComputed),
			hashify(mediaComputed),
			hashify((mediaComputed || {}).mimeTypes),
			hashify(navigatorComputed),
			hashify(liesComputed),
			hashify(trashComputed),
			hashify(capturedErrorsComputed),
			hashify(svgComputed),
			hashify(resistanceComputed),
			hashify(intlComputed),
			hashify(featuresComputed),
			hashify(
				(() => {
					const {
						bluetoothAvailability,
						device,
						deviceMemory,
						hardwareConcurrency,
						maxTouchPoints,
						oscpu,
						platform,
						system,
						userAgentData
					} = navigatorComputed || ({} as any)
					const {
						architecture,
						bitness,
						mobile,
						model,
						platform: uaPlatform,
						platformVersion
					} = userAgentData || {}
					const { 'any-pointer': anyPointer } = cssMediaComputed?.mediaCSS || {}
					const { colorDepth, pixelDepth, height, width } = screenComputed || {}
					const { location, locationEpoch, zone } = timezoneComputed || {}
					const {
						deviceMemory: deviceMemoryWorker,
						hardwareConcurrency: hardwareConcurrencyWorker,
						gpu,
						platform: platformWorker,
						system: systemWorker,
						timezoneLocation: locationWorker,
						userAgentData: userAgentDataWorker
					} = workerScopeComputed || {}
					const { compressedGPU, confidence } = gpu || {}
					const {
						architecture: architectureWorker,
						bitness: bitnessWorker,
						mobile: mobileWorker,
						model: modelWorker,
						platform: uaPlatformWorker,
						platformVersion: platformVersionWorker
					} = userAgentDataWorker || {}

					return [
						anyPointer,
						architecture,
						architectureWorker,
						bitness,
						bitnessWorker,
						bluetoothAvailability,
						colorDepth,
						...(compressedGPU && confidence != 'low' ? [compressedGPU] : []),
						device,
						deviceMemory,
						deviceMemoryWorker,
						hardwareConcurrency,
						hardwareConcurrencyWorker,
						height,
						location,
						locationWorker,
						locationEpoch,
						maxTouchPoints,
						mobile,
						mobileWorker,
						model,
						modelWorker,
						oscpu,
						pixelDepth,
						platform,
						platformWorker,
						platformVersion,
						platformVersionWorker,
						system,
						systemWorker,
						uaPlatform,
						uaPlatformWorker,
						width,
						zone
					]
				})()
			)
		]).catch(error => {
			throw error
		})

		// console.log(performance.now()-start)
		const hashTimeEnd = hashStartTime()
		const timeEnd = timeStart()

		console.log(`Hashing complete in ${hashTimeEnd.toFixed(2)}ms`)

		if (PARENT_PHANTOM) {
			// @ts-ignore
			PARENT_PHANTOM.parentNode.removeChild(PARENT_PHANTOM)
		}

		const fingerprint = {
			workerScope: !workerScopeComputed ? undefined : { ...workerScopeComputed, $hash: workerHash },
			navigator: !navigatorComputed ? undefined : { ...navigatorComputed, $hash: navigatorHash },
			windowFeatures: !windowFeaturesComputed
				? undefined
				: { ...windowFeaturesComputed, $hash: windowHash },
			headless: !headlessComputed ? undefined : { ...headlessComputed, $hash: headlessHash },
			htmlElementVersion: !htmlElementVersionComputed
				? undefined
				: { ...htmlElementVersionComputed, $hash: htmlHash },
			cssMedia: !cssMediaComputed ? undefined : { ...cssMediaComputed, $hash: cssMediaHash },
			css: !cssComputed ? undefined : { ...cssComputed, $hash: cssHash },
			screen: !screenComputed ? undefined : { ...screenComputed, $hash: screenHash },
			voices: !voicesComputed ? undefined : { ...voicesComputed, $hash: voicesHash },
			media: !mediaComputed ? undefined : { ...mediaComputed, $hash: mediaHash },
			canvas2d: !canvas2dComputed ? undefined : { ...canvas2dComputed, $hash: canvas2dHash },
			canvasWebgl: !canvasWebglComputed
				? undefined
				: { ...canvasWebglComputed, pixels: pixelsHash, pixels2: pixels2Hash, $hash: canvasWebglHash },
			maths: !mathsComputed ? undefined : { ...mathsComputed, $hash: mathsHash },
			consoleErrors: !consoleErrorsComputed
				? undefined
				: { ...consoleErrorsComputed, $hash: consoleErrorsHash },
			timezone: !timezoneComputed ? undefined : { ...timezoneComputed, $hash: timezoneHash },
			clientRects: !clientRectsComputed ? undefined : { ...clientRectsComputed, $hash: rectsHash },
			offlineAudioContext: !offlineAudioContextComputed
				? undefined
				: { ...offlineAudioContextComputed, $hash: audioHash },
			fonts: !fontsComputed ? undefined : { ...fontsComputed, $hash: fontsHash },
			lies: !liesComputed ? undefined : { ...liesComputed, $hash: liesHash },
			trash: !trashComputed ? undefined : { ...trashComputed, $hash: trashHash },
			capturedErrors: !capturedErrorsComputed
				? undefined
				: { ...capturedErrorsComputed, $hash: errorsHash },
			svg: !svgComputed ? undefined : { ...svgComputed, $hash: svgHash },
			resistance: !resistanceComputed ? undefined : { ...resistanceComputed, $hash: resistanceHash },
			intl: !intlComputed ? undefined : { ...intlComputed, $hash: intlHash },
			features: !featuresComputed ? undefined : { ...featuresComputed, $hash: featuresHash }
		}
		return {
			fingerprint,
			styleSystemHash,
			styleHash,
			domRectHash,
			mimeTypesHash,
			canvas2dImageHash,
			canvasWebglImageHash,
			canvas2dPaintHash,
			canvas2dTextHash,
			canvas2dEmojiHash,
			canvasWebglParametersHash,
			deviceOfTimezoneHash,
			timeEnd
		}
	}

	// fingerprint and render
	const [
		{
			fingerprint,
			styleSystemHash,
			styleHash,
			domRectHash,
			mimeTypesHash,
			canvas2dImageHash,
			canvas2dPaintHash,
			canvas2dTextHash,
			canvas2dEmojiHash,
			canvasWebglImageHash,
			canvasWebglParametersHash,
			deviceOfTimezoneHash
		},
		storage
	] = await Promise.all([getFingerprint().catch(error => console.error(error)) || ({} as any), getStorage()])

	if (!fingerprint) throw new Error('Fingerprint failed!')

	return {
		fingerprint,
		styleSystemHash,
		styleHash,
		domRectHash,
		mimeTypesHash,
		canvas2dImageHash,
		canvas2dPaintHash,
		canvas2dTextHash,
		canvas2dEmojiHash,
		canvasWebglImageHash,
		canvasWebglParametersHash,
		deviceOfTimezoneHash,
		storage
	}
}

export const getFingerprint = async () => {
	let code = null
	let err = null

	try {
		code = await getCode()
	} catch (error) {
		err = error
	}

	const string = JSON.stringify(code)
	const buffer = new TextEncoder().encode(string)
	const hash_buffer = await crypto.subtle.digest('SHA-256', buffer)
	const hash_array = Array.from(new Uint8Array(hash_buffer))
	const hash_hex = hash_array.map(byte => byte.toString(16).padStart(2, '0')).join('')

	return { code: hash_hex, err }
}
