import { Router } from 'express';
import { OrderItemsController } from '../controllers/index.js';

export const OrderItemsRouter = Router();

OrderItemsRouter.post('/add', OrderItemsController.addToCart);
// OrderItemsRouter.post('/remove', OrderItemsController.removeFromCart);
// OrderItemsRouter.post('/substract', OrderItemsController.substractFromCart);
