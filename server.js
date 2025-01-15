import express from "express"

// Add these imports to your existing imports
import { fileURLToPath } from "url"
import path from "path"
const PORT = process.env.PORT

// Create __dirname and __filename variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create an instance of an Express application
const app = express()
const name = process.env.NAME // <-- NEW

app.use(express.static(path.join(__dirname, "public")))

// Define a route handler for the root URL ('/')
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"))
})

app.get("/page1", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/page1.html"))
})

app.get("/page2", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/page2.html"))
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
