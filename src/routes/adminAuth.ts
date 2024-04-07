import { Router } from 'express';
import authController from '../controller/authController';
const adminAuthRouter = Router();

adminAuthRouter.post('/signup', authController.signupAdmin);
adminAuthRouter.post('/login', authController.loginAdmin);

export default adminAuthRouter;