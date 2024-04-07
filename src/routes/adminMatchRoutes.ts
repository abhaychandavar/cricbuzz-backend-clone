import { Router } from 'express';
import matchController from '../controller/matchController';
const adminMatchRouter = Router();

adminMatchRouter.post('/', matchController.createMatch);

export default adminMatchRouter;