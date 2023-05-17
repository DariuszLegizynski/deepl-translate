import "dotenv/config.js"
import * as deepl from "deepl-node"

const getSQLProducts = async () => {
	const API_URL = process.env.API_URL
	const getProducts = await fetch(`${API_URL}`).catch(err => console.error(err))
	const products = await getProducts.json()

	return products
}

const translate = async text => {
	if (!text || text.length === 0) return ""
	const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY
	const TARGET_LANG = process.env.TARGET_LANG
	const SOURCE_LANG = process.env.SOURCE_LANG

	const translator = new deepl.Translator(DEEPL_AUTH_KEY)

	const translated = await translator
		.translateText(text, SOURCE_LANG, TARGET_LANG, { formality: "more" })
		.then(result => {
			return result.text
		})
		.catch(error => {
			console.error(error)
		})

	return translated
}

const editData = async translatedDescription => {
	const API_URL = process.env.API_URL

	try {
		await fetch(`${API_URL}/${translatedDescription.products_id}/${translatedDescription.language_id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(translatedDescription),
		})
	} catch (err) {
		console.error(err)
	}
}

const main = async () => {
	const productsList = await getSQLProducts()

	console.log(productsList)
	let count = 0

	for (let i of productsList) {
		const translatedContent = {}
		console.log("proceeding: ", i.products_id, i.language_id)
		translatedContent.products_id = i.products_id
		translatedContent.language_id = i.language_id
		translatedContent.products_name = await translate(i.products_name)
		translatedContent.products_name_info = i.products_name_info
		translatedContent.products_description = await translate(i.products_description)
		translatedContent.products_short_description = await translate(i.products_short_description)
		translatedContent.products_viewed = i.products_viewed
		translatedContent.products_meta_title_tag = await translate(i.products_meta_title_tag)
		translatedContent.products_meta_desc_tag = await translate(i.products_meta_desc_tag)
		translatedContent.products_meta_keywords_tag = await translate(i.products_meta_keywords_tag)
		translatedContent.products_seo_url = i.products_seo_url
		translatedContent.products_link_canonical = i.products_link_canonical
		translatedContent.products_search_tag = i.products_search_tag
		translatedContent.products_og_title = i.products_og_title
		translatedContent.products_og_description = i.products_og_description

		count++
    console.log(count)

		editData(translatedContent)
	}

	console.log("ALL OK")
}

main()
