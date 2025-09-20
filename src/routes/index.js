
import express from "express"
import homeController from "../controllers/homeController"
import usersRouter from "./usersRoute"
import apiRoute from "./apiRoute.js"

const router = express.Router()

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld)
    router.use('/users', usersRouter)
    router.use('/api', apiRoute)
    
    return app.use("/", router)
}

export default initWebRoutes
