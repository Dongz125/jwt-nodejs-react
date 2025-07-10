import express from "express";
import userController from "../controllers/userController";

const usersRouter = express.Router();

usersRouter.get("/", userController.handleUserPage);
usersRouter.post("/create-user", userController.handleCreateNewUser);
usersRouter.post('/delete-user/:userId', userController.handleDeleteUserById)
usersRouter.get('/update-user/:userId', userController.handleUpdateUserPage)
usersRouter.post('/update-user/updating', userController.updateUserInformation)

export default usersRouter;
