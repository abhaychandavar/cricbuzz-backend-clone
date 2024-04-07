import responseHandler from "../utils/responseHandler";
import { Response, Request } from 'express';
import { z } from "zod";
import playersService from "../services/players";

const createPlayerType = z.object({
    name: z.string(),
})
class PlayersController {
    createPlayer = async (req: Request, res: Response) => {
        try {
            createPlayerType.parse(req.body);
            const { name } = req.body;
            const player = await playersService.createPlayer({ name });
            return responseHandler.sendSuccessResponse({
                data: player,
                message: 'Create player successful',
            }, res)
        }
        catch (error) {
            console.log(error);
            return responseHandler.sendErrorResponse(error, res);
        }
    }

    getPlayerStats = async (req: Request, res: Response) => {
        try {
            const { playerId } = req.params;
            const stats = await playersService.getPlayerStats(Number(playerId));
            return responseHandler.sendSuccessResponse({
                data: stats,
                message: 'Player stats fetched',
            }, res)
        }
        catch (error) {
            console.log(error);
            return responseHandler.sendErrorResponse(error, res);
        }
    }
}

const playersController = new PlayersController();
export default playersController;