import { Router } from 'express';
import { PaymentsController } from '../controllers/index.js';

export const PaymentsRouter = Router();

PaymentsRouter.get('/', PaymentsController.getAllPayments);
PaymentsRouter.post('/', PaymentsController.createNewPayment);
PaymentsRouter.get('/:id', PaymentsController.getPaymentById);
PaymentsRouter.patch('/:id', PaymentsController.updatePaymentById);
PaymentsRouter.delete('/:id', PaymentsController.deletePaymentById);
