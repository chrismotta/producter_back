const express = require("express")
const bodyParser = require("body-parser")
const usersApiRouter = require("./routes/api/users")
const authApiRouter = require("./routes/api/auth")

// App
const app = express()

// Middlewares
app.use(bodyParser.json())

// Routes
app.use("/api/users", usersApiRouter)
app.use("/api/auth", authApiRouter)

// Default Routes / Redirects
app.get("/", (req, res, next) => {
    res.send({
        "AppName": "Gestor JazmeenDeco",
        "AppVersion": "2.6.1"
    })
})

// Server listener
const server = app.listen(8000, () => {
    console.log(`Listening http://localhost:${server.address().port}`)
})
