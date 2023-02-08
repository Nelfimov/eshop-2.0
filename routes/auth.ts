import { Router } from 'express';

const AuthRouter = Router();

AuthRouter.post('/login', authController.login);
