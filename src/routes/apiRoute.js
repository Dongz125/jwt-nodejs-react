import express from "express";
import apiController from "../controllers/apiController.js";
import userApiRoute from "./userApiRoute.js";
import groupApiRoute from "./groupApiRoute.js";
import JWTActions from "../middleware/JWTActions.js";

const apiRoute = express.Router();

apiRoute.all("*", JWTActions.checkUserJWT, JWTActions.checkUserPermission);
// apiRoute.get('/test', apiController.testApi);
apiRoute.post("/register", apiController.handleRegister);
apiRoute.post("/login", apiController.handleLogin);

apiRoute.use("/user", userApiRoute);
apiRoute.use("/group", groupApiRoute);

export default apiRoute;
