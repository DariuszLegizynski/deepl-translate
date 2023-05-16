import "dotenv/config.js"
import * as deepl from "deepl-node"

const getSQLProducts = async () => {
	const API_URL = process.env.API_URL
	const getProducts = await fetch(`${API_URL}`).catch(err => console.error(err))
	const products = await getProducts.json()
	return products
}

const translate = async text => {
  return text
	if (!text || text.length === 0) return ""
	const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY
	const TARGET_LANG = process.env.TARGET_LANG
	const SOURCE_LANG = process.env.SOURCE_LANG

	const translator = new deepl.Translator(DEEPL_AUTH_KEY)

	const translated = await translator
		.translateText(text, SOURCE_LANG, TARGET_LANG, { formality: "more" })
		.then(result => {
			console.log("result.text: ", result.text)
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

  const productsList = [
    {
      products_id: 1,
      language_id: 5,
      products_name: 'bziuuuuuuuuuuu',
      products_name_info: '',
      products_description: 'Model rakiety <strong>Lunar Shuttle</strong> o długości 43 cm, wyprodukowana przez amerykańską firmę <strong>MPC</strong>.<strong>Charakterystyka:</strong><ul><li>Odpowiednie dla osób powyżej 10 roku życia pod nadzorem osoby dorosłej</li><li>Rakieta wykonana z wytrzymałej tektury oraz plastiku.</li><li>W zestawie jedno-członowa rakieta, plastikowa elementy wraz ze statecznikami, nakleki, linki, oraz spadochron.</li><li>Średnica mocowania silnika: 19 mm</li></ul> Oznaczenie producenta: MPCRKT012',
      products_short_description: '',
      products_viewed: 15,
      products_meta_title_tag: 'Rakieta - Lunar Shuttle',
      products_meta_desc_tag: 'Model rakiety Lunar Shuttle o długości 43 cm, wyprodukowana przez amerykańską firmę MPC.Charakterystyka:Odpowiednie dla osób powyżej 10 roku życia pod nadzorem osoby dorosłejRakieta wykonana z wytrzymałej tektury oraz plastiku.W zestawie',  
      products_meta_keywords_tag: 'Rakieta - Lunar Shuttle',
      products_seo_url: '',
      products_link_canonical: '',
      products_search_tag: '',
      products_og_title: '',
      products_og_description: ''
    },
    {
      products_id: 2,
      language_id: 5,
      products_name: 'Cos tam',
      products_name_info: '',
      products_description: 'Model plastikowy samolotu Huges H-4 Hercules Spruce Goose, wyprodukowany przez amerykańską firmę Minicraft Model Kits. <strong>Charakterystyka:</strong><ul><li>Skala: 1:200</li><li>Części precyzyjnie odwzorowane w plastiku</li><li>Szczegółowo wykonane wnętrze</li><li>Zestaw naklejek</li><li>Instrukcja</li></ul> <strong>Wymagane do złożenia:</strong><ul><li>Nóż modelarski</li><li>Cążki modelarskie do odcinania odlewów</li></ul><ul><li>Klej do modeli plastikowych</li></ul><ul><li>Farba</li></ul> Oznaczenie producenta: 11657',
      products_short_description: '',
      products_viewed: 17,
      products_meta_title_tag: 'Model plastikowy - Samolot (hydroplan) Huges H-4 Hercules Spruce Goose - Minic',
      products_meta_desc_tag: 'Model plastikowy samolotu Huges H-4 Hercules Spruce Goose, wyprodukowany przez amerykańską firmę Minicraft Model Kits. Charakterystyka:Skala: 1:200Części precyzyjnie odwzorowane w plastikuSzczegółowo wykonane wnętrzeZestaw',
      products_meta_keywords_tag: 'Model plastikowy - Samolot (hydroplan) Huges H-4 Hercules Spruce Goose - Minicraft',
      products_seo_url: '',
      products_link_canonical: '',
      products_search_tag: '',
      products_og_title: '',
      products_og_description: ''
    }
  ]

	for (let i of productsList) {
    const translatedContent = {}
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

    editData(translatedContent)
  }

  console.log("ALL OK")
}

main()