import { Router } from 'express';
import { passport } from '../configs/index.js';
import { OrdersController } from '../controllers/index.js';
import { isUserAdmin } from '../middlewares/index.js';
import { AdminOrderRouter } from './order-admin.js';

export const OrdersRouter = Router();

OrdersRouter.use(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  AdminOrderRouter
);

OrdersRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  OrdersController.getOrder
);
OrdersRouter.patch(
  '/:id/address',
  passport.authenticate('jwt', { session: false }),
  OrdersController.updateAddress
);
OrdersRouter.patch(
  '/:id/items',
  passport.authenticate('jwt', { session: false }),
  OrdersController.addItems
);
OrdersRouter.patch(
  '/:id/payment',
  passport.authenticate('jwt', { session: false }),
  OrdersController.updatePayment
);
OrdersRouter.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  OrdersController.changeOrder
);
OrdersRouter.patch(
  '/:id/ordered',
  passport.authenticate('jwt', { session: false }),
  OrdersController.changeOrderStatus
);
