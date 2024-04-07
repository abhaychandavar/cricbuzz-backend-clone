import { Router } from 'express';
import matchRouter from './match';
import playerRouter from './player';
const publicRouter = Router();

publicRouter.use('/matches', matchRouter);
publicRouter.use('/players', playerRouter);

export default publicRouter;