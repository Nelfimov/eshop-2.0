import { Router } from 'express';
import { passport } from '../configs/passport.js';
import { ProductsController } from '../controllers/index.js';
import { isUserAdmin } from '../middlewares/is-user-admin.js';

export const ProductRouter = Router();

ProductRouter.get('/', ProductsController.getAll);
ProductRouter.post(
  '/',
  passport.authenticate('jwt', { session: false, failWithError: true }),
  isUserAdmin,
  ProductsController.createNew
);
ProductRouter.get('/:id', ProductsController.getById);
