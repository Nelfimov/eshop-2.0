import { Router } from 'express';
import { ProductsController } from '../controllers/index.js';

export const ProductRouter = Router();

ProductRouter.get('/', ProductsController.getAll);
ProductRouter.get('/:id', ProductsController.getById);
