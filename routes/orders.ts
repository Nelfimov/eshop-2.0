import { Router } from 'express';
import { passport } from '../configs/index.js';
import { OrdersController } from '../controllers/index.js';
import { isUserAdmin } from '../middlewares/index.js';

export const OrdersRouter = Router();

OrdersRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  OrdersController.getOrder
);
OrdersRouter.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  OrdersController.changeOrder
);
OrdersRouter.patch(
  '/:id/address',
  passport.authenticate('jwt', { session: false }),
  OrdersController.changeOrderAddress
);
OrdersRouter.patch(
  '/:id/finished',
  passport.authenticate('jwt', { session: false }),
  OrdersController.changeOrderStatus
);
OrdersRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  OrdersController.deleteOrder
);
