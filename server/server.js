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

	try {
		const updateProduct = await pool.query("UPDATE todos SET products_name = $1, products_description = $2, products_meta_title_tag = $3, products_meta_desc_tag = $4, products_meta_keywords_tag = $5 WHERE products_id = $6 AND language_id = $7;", [
			products_name, products_description, products_short_description, products_meta_title_tag, products_meta_desc_tag, products_meta_keywords_tag, products_id, language_id
		])
		res.json(updateProduct)
	} catch (err) {
		console.log(err)
	}
})

app.listen(PORT, () => {
	console.log(`server is up an running on port ${PORT}`)
})
