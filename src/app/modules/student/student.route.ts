import express from 'express'
import { StundentControllers } from './student.controller'

const router = express.Router()



router.get('/', StundentControllers.getAllStudents)
router.get('/:studentId', StundentControllers.getSingleStudent)
router.delete('/:studentId', StundentControllers.deleteStudent)




export const studentRoutes = router