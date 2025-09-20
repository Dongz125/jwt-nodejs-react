import express from 'express'
import userApiController from '../controllers/userApiController'

const userApiRoute = express.Router()

userApiRoute.get('/show', userApiController.readUser)
userApiRoute.get('/detail-user', userApiController.readUserById)
userApiRoute.post('/create', userApiController.createUser)
userApiRoute.patch('/update', userApiController.updateUser)
userApiRoute.delete('/delete', userApiController.deleteUser)

export default userApiRoute