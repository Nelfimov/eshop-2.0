import { Router } from 'express';
import { productsController } from '../controllers/index.js';

export const ProductRouter = Router();

ProductRouter.get('/', productsController.getAll);
ProductRouter.get('/:id', productsController.getById);
