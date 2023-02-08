import { Router } from 'express';
import { productsController } from '../controllers/index.js';

const customRouter = Router();

customRouter.get('/', productsController.getAll);
