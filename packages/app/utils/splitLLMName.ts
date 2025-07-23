import { model_icon_map } from '@/components/LLM'

export default (name: string) => {
	const model_names = Object.keys(model_icon_map)

	for (const model_name of model_names) {
		const index = name.toLowerCase().indexOf(model_name.toLowerCase())

		if (index !== -1) {
			const branch = name.substring(index + model_name.length).trim()

			return { model: model_name, branch: branch }
		}
	}

	return { branch: name }
}
