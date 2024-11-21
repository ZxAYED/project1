import express from 'express'
import { StundentControllers } from './student.controller'

const router = express.Router()

router.post('/create-student', StundentControllers.createStudent)

export const studentRoutes = router