import { OrderAdminController } from '../../controllers/index.js';
import { Router } from 'express';

export const AdminProductRouter = Router();

AdminProductRouter.get('/', OrderAdminController.getAllOrdersAdmin);
AdminProductRouter.get('/:id', OrderAdminController.getOneOrderAdmin);
AdminProductRouter.post('/:id/delete', OrderAdminController.deleteOrderAdmin);
