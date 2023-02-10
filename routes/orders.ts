import { Router } from 'express';

const OrdersRouter = Router();

OrdersRouter.post('/', OrdersController.createNewOrder);
OrdersRouter.patch('/', OrdersController.changeOrder);
OrdersRouter.delete('/', OrdersController.deleteOrder);
