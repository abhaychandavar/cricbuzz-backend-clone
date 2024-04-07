import { Router } from 'express';
import matchController from '../controller/matchController';
const adminMatchRouter = Router();

adminMatchRouter.post('/', matchController.createMatch);
adminMatchRouter.put('/:matchId', matchController.updateMatch);

export default adminMatchRouter;