import { Router } from 'express';
import matchController from '../controller/matchController';
const matchRouter = Router();

matchRouter.get('/', matchController.getMatches);
matchRouter.get('/:matchId', matchController.getMatcheDetailsById);

export default matchRouter;