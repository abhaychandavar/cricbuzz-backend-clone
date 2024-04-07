import responseHandler from "../utils/responseHandler";
import { Response, Request } from 'express';
import { ZodError, z } from "zod";
import errors from '../utils/errors';
import AppError from "../utils/appError";
import matchService from "../services/matchService";
import moment from "moment";

const createMatchType = z.object({
    team_1: z.string(),
    team_2: z.string(),
    date: z.date(),
    venue: z.string()
});
class MatchController {
    createMatch = async (req: Request, res: Response) => {
        try {
            const { preParsedDate } = req.body;
            const preParsedBody = {
                ...req.body,
                date: moment(preParsedDate).toDate(),
            }
            createMatchType.parse(preParsedBody);
            const { team_1, team_2, date, venue } = preParsedBody;
            const body = {
                team1: team_1,
                team2: team_2,
                date,
                venue
            }
            const user = await matchService.createMatch({...body, team1Name: body.team1, team2Name: body.team2});
            return responseHandler.sendSuccessResponse({
                data: user,
                message: 'Match created successfully',
            }, res)
        }
        catch (error) {
            console.log(error);
            if (error instanceof ZodError) return responseHandler.sendErrorResponse(new AppError(errors.ERR_INVALID_REQUEST_DATA), res, error.errors);
            return responseHandler.sendErrorResponse(error, res);
        }
    }

    getMatches = async (req: Request, res: Response) => {
        try {
            const { page, perPage, date, team, team1, team2 } = req.query;
            console.log('q >>', req.query)
            const user = await matchService.getMatches({ 
                page: typeof page === 'string' ? Number(page) : 1,
                perPage: typeof perPage === 'string' ? Number(perPage): 50,
                date: typeof date === 'string' ? moment(date).utc().toDate() : undefined,
                teamName: typeof team === 'string' ? team : undefined,
                team1Name: typeof team1 === 'string' ? team1 as string : undefined,
                team2Name: typeof team2 === 'string' ? team2 as string : undefined
            });
            return responseHandler.sendSuccessResponse({
                data: user,
                message: 'Match schedules fetched successfully',
            }, res)
        }
        catch (error) {
            console.log(error);
            if (error instanceof ZodError) return responseHandler.sendErrorResponse(new AppError(errors.ERR_INVALID_REQUEST_DATA), res, error.errors);
            return responseHandler.sendErrorResponse(error, res);
        }
    }

    getMatcheDetailsById = async (req: Request, res: Response) => {
        try {
            const { matchId } = req.params;
            const user = await matchService.getMatchDetails(Number(matchId));
            return responseHandler.sendSuccessResponse({
                data: user,
                message: 'Match details successfully fetched',
            }, res)
        }
        catch (error) {
            console.log(error);
            if (error instanceof ZodError) return responseHandler.sendErrorResponse(new AppError(errors.ERR_INVALID_REQUEST_DATA), res, error.errors);
            return responseHandler.sendErrorResponse(error, res);
        }
    }
}

const matchController = new MatchController();
export default matchController;