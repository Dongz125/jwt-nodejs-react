import express from 'express'
import groupApiController from '../controllers/groupApiController'

const groupApiRoute = express.Router()

groupApiRoute.get("/show", groupApiController.getGroups)

export default groupApiRoute