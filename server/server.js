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
		const getProducts = await pool.query("SELECT * FROM products_description LIMIT 1")
		res.status(200).json(getProducts.rows)
	} catch (err) {
		console.log(err)
	}
})

app.listen(PORT, () => {
	console.log(`server is up an running on port ${PORT}`)
})
