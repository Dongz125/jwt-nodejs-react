
import express from "express"
import homeController from "../controllers/homeController"
import usersRouter from "./usersRoute"

const router = express.Router()

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld)
    router.use('/users', usersRouter)
    
    return app.use("/", router)
}

export default initWebRoutes
