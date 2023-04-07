import { Router } from 'express';
import { passport } from '../configs/passport.js';
import { ProductsController } from '../controllers/index.js';
import { isUserAdmin } from '../middlewares/is-user-admin.js';
import { OrderItemsRouter } from './order-items.js';
import { upload } from '../configs/multer.js';

export const ProductRouter = Router();

ProductRouter.get('/', ProductsController.getAll);
ProductRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  upload.fields([
    { name: 'titleImage', maxCount: 1 },
    { name: 'otherImages', maxCount: 10 },
  ]),
  ProductsController.create
);

ProductRouter.get('/:id', ProductsController.getById);
ProductRouter.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  ProductsController.updateOne
);
ProductRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isUserAdmin,
  ProductsController.deleteOne
);
ProductRouter.use('/:id', OrderItemsRouter);
