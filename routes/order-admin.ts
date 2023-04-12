import { Router } from 'express';
import { OrderAdminController } from '../controllers/index.js';

export const AdminOrderRouter = Router();

AdminOrderRouter.get('/', OrderAdminController.getAllOrdersAdmin);
AdminOrderRouter.get('/:id');
AdminOrderRouter.post('/:id/delete', OrderAdminController.deleteOrderAdmin);
