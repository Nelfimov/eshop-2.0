import { Router } from 'express';

export const OrderItemsRouter = Router();

OrderItemsRouter.post('/add', OrderItemsController.addToCart);
OrderItemsRouter.post('/remove', OrderItemsController.addToCart);
OrderItemsRouter.post('/substract', OrderItemsController.addToCart);
