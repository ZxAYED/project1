import express from 'express'; import { Request, Response } from 'express';
import { studentRoutes } from './app/modules/student/student.route';
import { userRouter } from './app/modules/user/user.router';
import cors from 'cors'

const app = express()


app.use(express.json());
app.use(cors())


app.use('/api/v1/students', studentRoutes)
app.use('/api/v1/users', userRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hotat server chalu hoise')
})
export default app