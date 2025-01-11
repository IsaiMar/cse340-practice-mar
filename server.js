import express from "express"

// Create an instance of an Express application
const app = express()
const name = process.env.NAME // <-- NEW

// Define a route handler for the root URL ('/')
app.get("/", (req, res) => {
  res.send(`Hello, ${name}`)
})
app.get("/new-route", (req, res) => {
  res.send("This is a new route!")
})

// Define the port number the server will listen on
const PORT = 3000

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
