import express from 'express'
import { StundentControllers } from './student.controller'

const router = express.Router()

router.post('/create-student', StundentControllers.createStudent)

router.get('/', StundentControllers.getAllStudents)
router.get('/:studentId', StundentControllers.getSingleStudent)




export const studentRoutes = router