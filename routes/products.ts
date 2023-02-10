import { Router } from 'express';
import { passport } from '../configs/passport.js';
import { ProductsController } from '../controllers/index.js';
import { isUserAdmin } from '../middlewares/is-user-admin.js';
import { OrderItemsRouter } from './order-items.js';

export const ProductRouter = Router();

ProductRouter.get('/', ProductsController.getAll);
ProductRouter.post(
  '/',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  isUserAdmin,
  ProductsController.create
);

ProductRouter.get('/:id', ProductsController.getById);
ProductRouter.patch(
  '/:id',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  isUserAdmin,
  ProductsController.updateOne
);
ProductRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  isUserAdmin,
  ProductsController.deleteOne
);
ProductRouter.use('/:id', OrderItemsRouter);
