import "dotenv/config.js"
import * as deepl from "deepl-node"

const getSQLProducts = async () => {
  const response = await fetch("http://localhost:3000/api/v1/products").catch(err => console.error(err))
  const data = await response.json()
  return data
}

const main = async () => {
  const productData = await getSQLProducts()
  console.log(productData)
  
  const translate = async () => {
    const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY
    const TARGET_LANG = process.env.TARGET_LANG
  
    const translator = new deepl.Translator(DEEPL_AUTH_KEY)
  
    // await translator
    // 	.translateText("Hello, world!", null, TARGET_LANG, { formality: 'more' })
    // 	.then(result => {
    // 		console.log(result.text)
    // 	})
    // 	.catch(error => {
    // 		console.error(error)
    // 	})
  }
  
  translate()
}

main()