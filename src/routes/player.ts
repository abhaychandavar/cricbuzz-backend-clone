import { Router } from 'express';
import playersController from '../controller/playersController';
const playerRouter = Router();

playerRouter.get('/:playerId/stats', playersController.getPlayerStats);

export default playerRouter;