import { Router } from 'express';
import playersController from '../controller/playersController';
const adminPlayerRouter = Router();

adminPlayerRouter.post('/', playersController.createPlayer);

export default adminPlayerRouter;