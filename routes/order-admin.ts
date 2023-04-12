import { Router } from 'express';

export const AdminOrderRouter = Router();

AdminOrderRouter.get('/');
AdminOrderRouter.get('/:id');
AdminOrderRouter.post('/:id/delete');
