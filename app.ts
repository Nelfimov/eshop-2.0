import createError from 'http-errors';
import express, { json, Response, urlencoded } from 'express';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import { HttpException } from './@types/common/index.js';
import { passport, connectToMongo } from './configs/index.js';

dotenv.config();

const app = express();

await connectToMongo(process.env.MONGODB_URL);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(json());
app.use(passport.initialize());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use('/statics', express.static(path.join(__dirname, 'statics')));

app.use((req, res, next) => next(createError(404)));
// @ts-expect-error: This is unknown error
app.use(async (err: HttpException, req: Request, res: Response) => {
  res.status(err.status || 500);
  console.log(err.message);
  await res.json({ success: false, message: err.message });
});

export default app;
