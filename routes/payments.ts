import { Router } from 'express';
import { passport } from '../configs/passport.js';
import { PaymentsController } from '../controllers/index.js';
import { isUserAdmin } from '../middlewares/is-user-admin.js';

export const PaymentsRouter = Router();

PaymentsRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  PaymentsController.getAllPayments
);
PaymentsRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  PaymentsController.createNewPayment
);
PaymentsRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  PaymentsController.getPaymentById
);
PaymentsRouter.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  PaymentsController.updatePaymentById
);
PaymentsRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  PaymentsController.deletePaymentById
);
