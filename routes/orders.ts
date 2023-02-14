import { Router } from 'express';
import { passport } from '../configs/index.js';
import { OrdersController } from '../controllers/index.js';
import { isUserAdmin } from '../middlewares/index.js';

export const OrdersRouter = Router();

OrdersRouter.post(
  '/',
  passport.authenticate('jwt-user', { session: false }),
  OrdersController.getOrCreateOrder
);
OrdersRouter.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  OrdersController.changeOrder
);
OrdersRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  OrdersController.deleteOrder
);
