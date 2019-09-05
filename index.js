const express = require("express")
const bodyParser = require("body-parser")
const usersApiRouter = require("./routes/api/users")
const authApiRouter = require("./routes/api/auth")
const cors = require("cors")

// App
const app = express()

// Cors
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));

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
