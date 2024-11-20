import express, { Application, Request, Response } from 'express'
const app: Application = express()

import cors from 'cors'

// parser &cors
app.use(cors())
app.use(express.json())

type Req = Request
type Res = Response

app.get('/', (req: Req, res: Res) => {
  const a = 123
  res.send(a)
})




export default app
