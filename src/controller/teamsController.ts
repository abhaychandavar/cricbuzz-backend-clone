import responseHandler from "../utils/responseHandler";
import { Response, Request } from 'express';
import { ZodError, z } from "zod";
import teamsService from "../services/teamsService";
import errors from '../utils/errors';
import AppError from "../utils/appError";

const createTeamsType = z.object({
    name: z.string(),
});
const addPlayerToSquad = z.object({
    name: z.string(),
    teamId: z.number(),
    role: z.string().or(z.array(z.string()))
});

class TeamsController {
    createTeam = async (req: Request, res: Response) => {
        try {
            createTeamsType.parse(req.body);
            const { name } = req.body;
            const user = await teamsService.createTeam({ name });
            return responseHandler.sendSuccessResponse({
                data: user,
                message: 'Create team successful',
            }, res)
        }
        catch (error) {
            console.log(error);
            return responseHandler.sendErrorResponse(error, res);
        }
    }

    addPlayerToSquad = async (req: Request, res: Response) => {
        try {
            const { teamId } = req.params;
            const { name, role } = req.body;
            const body = {
                teamId: Number(String(teamId)),
                name,
                role
            }
            console.log(body)
            addPlayerToSquad.parse(body);
            const user = await teamsService.addPlayerToSquad({ ...body, playerName: body.name });
            return responseHandler.sendSuccessResponse({
                data: user,
                message: 'Player added to squad successfully',
            }, res)
        }
        catch (error) {
            console.log(error);
            if (error instanceof ZodError) return responseHandler.sendErrorResponse(new AppError(errors.ERR_INVALID_REQUEST_DATA), res, error.errors);
            return responseHandler.sendErrorResponse(error, res);
        }
    }
}

const teamsController = new TeamsController();
export default teamsController;