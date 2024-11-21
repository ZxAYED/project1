import express, { Application, Request, Response } from 'express'
const app: Application = express()

import cors from 'cors'
import { studentRoutes } from './app/modules/student/student.route'

// parser &cors
app.use(cors())
app.use(express.json())

type Req = Request
type Res = Response

// app routes
app.use('api/v1/students', studentRoutes)



app.get('/', (req: Req, res: Res) => {
  const a = 123

})




export default app
