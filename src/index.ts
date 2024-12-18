import express, { Express, Request, Response } from 'express';
import handshakeRouter from './router/handshake';
import userRouter from './router/user';
import errorHandler from './error-handler';

const app: Express = express();
const port = 5000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Stencilight Rank Server');
});

app.use('/handshake', handshakeRouter);
app.use('/user', userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});