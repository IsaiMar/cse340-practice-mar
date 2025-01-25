import express from "express"

// Add these imports to your existing imports
import { fileURLToPath } from "url"
import path from "path"
// Define important variables
const mode = process.env.MODE || "production"
const port = process.env.PORT || 3000

// Create __dirname and __filename variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create an instance of an Express application
const app = express()

// Set the view engine to EJS
app.set("view engine", "ejs")

// Set the views directory (where your templates are located)
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

// Home page
app.get("/", (req, res) => {
  const title = "Home Page"
  const content = "<h1>Welcome to the Home Page</h1>"
  const mode = process.env.MODE
  const port = process.env.PORT
  res.render("index", { title, content, mode, port })
})

app.get("/about", (req, res) => {
  const title = "About Us Page"
  const content = "<h1>Welcome to the About Us Page</h1>"
  res.render("index", { title, content, mode, port })
})

app.get("/contact", (req, res) => {
  const title = "Contact Page"
  const content = "<h1>Welcome to the Contact Page</h1>"
  res.render("index", { title, content, mode, port })
})

app.get("/explore/:name/:age/:id", (req, res) => {
  console.log(req.params)
  const { name, age, id } = req.params || {}
  const title = "Contact Page"
  const content = `<h1>Hello ${name}!</h1>
  <p>You are ${age} years old, ID: ${id}<p>`
  res.render("index", { title, content, mode, port })
})

// When in development mode, start a WebSocket server for live reloading
if (mode.includes("dev")) {
  const ws = await import("ws")

  try {
    const wsPort = parseInt(port) + 1
    const wsServer = new ws.WebSocketServer({ port: wsPort })

    wsServer.on("listening", () => {
      console.log(`WebSocket server is running on port ${wsPort}`)
    })

    wsServer.on("error", (error) => {
      console.error("WebSocket server error:", error)
    })
  } catch (error) {
    console.error("Failed to start WebSocket server:", error)
  }
}

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
