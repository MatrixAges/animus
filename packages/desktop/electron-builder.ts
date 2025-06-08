import type { Configuration } from 'electron-builder'

const { OS, ARCH } = process.env
const condition_config = {}
const condition_mac = {}

if (OS === 'mac') {
	condition_config['afterPack'] = './scripts/output/afterpack.js'
	condition_config['afterSign'] = './scripts/output/notarize.js'
	condition_config['electronLanguages'] = ['en', 'zh_CN']

	condition_config['dmg'] = { sign: false }

	condition_mac['hardenedRuntime'] = true
	condition_mac['gatekeeperAssess'] = false
	condition_mac['target'] = [ARCH ? { target: 'zip', arch: [ARCH] } : { target: 'dmg', arch: ['x64', 'arm64'] }]
}

if (OS === 'win') {
	condition_config['electronLanguages'] = ['en', 'zh-CN']
}

export default {
	...condition_config,
	productName: 'Animus',
	asar: true,
	compression: 'normal',
	directories: { output: (ARCH ? 'zip' : 'release') + '/${platform}/${arch}' },
	files: ['!*', '!**/*', 'assets/**/*', 'load/**/*', 'dist/**/*', 'app_dist/**/*'],
	artifactName: '${productName}-${version}-${arch}.${ext}',
	mac: {
		...condition_mac,
		icon: 'assets/logo/logo.icns',
		extendInfo: {
			'com.apple.security.cs.allow-jit': true,
			'Bundle name': 'Animus',
			ElectronTeamID: '84LQHT5G2Z',
			LSHasLocalizedDisplayName: true,
			ITSAppUsesNonExemptEncryption: 'NO'
		}
	},
	win: {
		target: [
			{
				target: 'nsis',
				arch: ['x64']
			}
		],
		icon: 'assets/logo/logo.ico',
		compression: 'maximum'
	},
	nsis: {
		oneClick: false,
		perMachine: true,
		allowToChangeInstallationDirectory: true,
		deleteAppDataOnUninstall: true,
		createDesktopShortcut: true,
		createStartMenuShortcut: true,
		installerIcon: 'assets/logo/logo.ico',
		uninstallerIcon: 'assets/logo/logo.ico',
		installerHeader: 'assets/logo/logo.ico',
		installerHeaderIcon: 'assets/logo/logo.ico'
	},
	fileAssociations: [
		{
			name: 'Animus',
			ext: 'elefile',
			icon: 'assets/logo/logo.ico'
		}
	],
	publish: [
		{
			provider: 'generic',
			url: 'http://localhost:8080/release/'
		}
	]
} as Configuration
