import { Router } from 'express';
import { AuthController } from '../controllers/index.js';

export const AuthRouter = Router();

AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/register', AuthController.register);
AuthRouter.get('/register-anon', AuthController.registerAnon);
