import { Router } from 'express';
import adminPlayerRouter from './adminPlayerRoutes';
import adminTeamRouter from './adminTeamRoutes';
import adminMatchRouter from './adminMatchRoutes';
const adminRouter = Router();

adminRouter.use('/players', adminPlayerRouter);
adminRouter.use('/teams', adminTeamRouter);
adminRouter.use('/matches', adminMatchRouter);

export default adminRouter;