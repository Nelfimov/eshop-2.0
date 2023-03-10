import createError from 'http-errors';
import express, { json, Response, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import { HttpException } from './@types/common/index.js';
import { passport } from './configs/index.js';
import * as router from './routes/index.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use('/statics', express.static(path.join(__dirname, 'statics')));

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome!' });
});
app.use('/auth', router.AuthRouter);
app.use('/products', router.ProductRouter);
app.use('/addresses', router.AddressesRouter);
app.use('/orders', router.OrdersRouter);
app.use('/payments', router.PaymentsRouter);

app.use((req, res, next) => next(createError(404)));
// @ts-expect-error: This is unknown error
app.use((err: HttpException, req: Request, res: Response) => {
  res.status(err.status || 500);
  console.error(err.message);
  res.json({ success: false, message: err.message });
});

export default app;
