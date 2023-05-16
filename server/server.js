import "dotenv/config.js"
import express from "express"
import cors from "cors"

import { pool } from "./db/index.js"

const PORT = process.env.PORT ?? 8000
const app = express()

const API_URL = process.env.API_URL

app.use(cors())
app.use(express.json())

app.get(`${API_URL}`, async (req, res) => {
	try {
		const getProducts = await pool.query("SELECT * FROM products_description WHERE language_id = 5 LIMIT 2")
		res.status(200).json(getProducts.rows)
	} catch (err) {
		console.log(err)
	}
})

app.put(`${API_URL}/:products_id/:language_id`, async (req, res) => {

	const { products_id, language_id } = req.params
	const { products_name, products_description, products_short_description, products_meta_title_tag, products_meta_desc_tag, products_meta_keywords_tag } = req.body

	console.log(products_id, language_id)
	console.log("#############")

	try {
		const updateProduct = await pool.query("UPDATE clone_products_description SET products_name = $1, products_description = $2, products_short_description = $3, products_meta_title_tag = $4, products_meta_desc_tag = $5, products_meta_keywords_tag = $6 WHERE products_id = $7 AND language_id = $8;", [
			products_name, products_description, products_short_description, products_meta_title_tag, products_meta_desc_tag, products_meta_keywords_tag, products_id, language_id
		])
		res.status(200).json(updateProduct)
	} catch (err) {
		console.log(err)
	}
})

app.listen(PORT, () => {
	console.log(`server is up an running on port ${PORT}`)
})
