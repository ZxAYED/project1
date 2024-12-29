import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors'
import GlobalErrorHandler from './app/middleWares/globalErrorHandler';
import notFound from './app/middleWares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser'


const app = express()


app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }))


app.use('/api/v1', router)


app.get('/', (req: Request, res: Response) => {
    res.send('Hotat server chalu hoise')
})



app.use(notFound as express.ErrorRequestHandler)
app.use(GlobalErrorHandler as express.ErrorRequestHandler)

export default app