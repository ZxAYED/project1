import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors'
import GlobalErrorHandler from './app/middleWares/globalErrorHandler';
import notFound from './app/middleWares/notFound';
import router from './app/routes';



const app = express()


app.use(express.json());
app.use(cors())


app.use('/api/v1', router)


app.get('/', (req: Request, res: Response) => {
    res.send('Hotat server chalu hoise')
})


app.use(GlobalErrorHandler)
app.use(notFound)
export default app