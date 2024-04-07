import { Router } from 'express';
import teamsController from '../controller/teamsController';
const adminTeamRouter = Router();

adminTeamRouter.post('/', teamsController.createTeam);
adminTeamRouter.post('/:teamId/squad', teamsController.addPlayerToSquad);

export default adminTeamRouter;