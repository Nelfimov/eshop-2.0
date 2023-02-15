import { Router } from 'express';
import { passport } from '../configs/passport.js';
import { OrderItemsController } from '../controllers/index.js';

export const OrderItemsRouter = Router({ mergeParams: true });

OrderItemsRouter.post(
  '/add',
  passport.authenticate('jwt-user', { session: false }),
  OrderItemsController.addToCart
);
// OrderItemsRouter.post('/remove', OrderItemsController.removeFromCart);
OrderItemsRouter.post('/substract', OrderItemsController.substractFromCart);
