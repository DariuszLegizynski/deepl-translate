import "dotenv/config.js"
import express from "express"
import cors from "cors"

import { pool } from "./db.js"

const PORT = process.env.PORT ?? 8000
const app = express()

app.use(cors())
app.use(express.json())

app.get("/todos/:userEmail", async (req, res) => {
	const { userEmail } = req.params

	try {
		const getProducts = await pool.query("SELECT * FROM products_description")
		res.json(getProducts.rows)
	} catch (err) {
		console.log(err)
	}
})