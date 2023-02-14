import { Router } from 'express';
import { passport } from '../configs/passport.js';
import { OrdersController } from '../controllers/index.js';
import { isUserAdmin } from '../middlewares/is-user-admin.js';

export const OrdersRouter = Router();

/**
 * Checks if user is authorized. If not, creates new anon and assigns to req.user.
 */
OrdersRouter.post(
  '/',
  passport.authenticate('jwt-user', { session: false }),
  OrdersController.getOrCreateOrder
);
/*
OrdersRouter.patch(
  '/:id',
  passport.authenticate('jwt'),
  isUserAdmin,
  OrdersController.changeOrder
);
*/
OrdersRouter.delete(
  '/:id',
  passport.authenticate('jwt'),
  isUserAdmin,
  OrdersController.deleteOrder
);
