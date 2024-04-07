import { Router, Request, Response, NextFunction } from 'express';
import adminAuthRouter from './adminAuth';
const indexRouter = Router();

indexRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
   res.send('Welcome to WorkIndia Cricbuzz!');
})
indexRouter.use('/api/admin', adminAuthRouter);

export default indexRouter;