import { Router, Request, Response, NextFunction } from 'express';
import adminAuthRouter from './adminAuth';
import adminRouter from './adminRoutes';
import authMiddleware from '../middlewares/auth';
import publicRouter from './publicRoutes';
const indexRouter = Router();

indexRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
   res.send('Welcome to Cricbuzz clone!');
})
indexRouter.use('/api', publicRouter);
indexRouter.use('/api/admin', adminAuthRouter);
indexRouter.use('/api/admin', authMiddleware.validateAdminUser, adminRouter);

export default indexRouter;