
import express from "express"
import bodyParser from "body-parser"
import configViewEngine from "./configs/viewEngine"
import initWebRoutes from "./routes"
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 8080

// config view engine
configViewEngine(app)

// config body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// init web routes
initWebRoutes(app)

app.listen(PORT, () => {
    console.log(`JWT Backend is on port ${PORT}`)
})
