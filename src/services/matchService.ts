import { Match, MatchStatus } from "../db/models/matches";
import { db } from "../";
import moment from "moment";
import teamsService from "./teamsService";
import AppError from "../utils/appError";
import errors from '../utils/errors';
import { Team } from "../db/models/teams";
import { Loaded } from "@mikro-orm/core";
import { Squad } from "src/db/models/squads";

class MatchService {
    createMatch = async ({
        team1Name,
        team2Name,
        date,
        venue
    }: {
        team1Name: string,
        team2Name: string,
        date: Date,
        venue: string
    }) => {
        const team1 = await teamsService.getTeamByName(team1Name);
        const team2 = await teamsService.getTeamByName(team2Name);
        if (!team1 || !team2) throw new AppError({ ...errors.ERR_INVALID_REQUEST_DATA, message: 'Invalid team name' });

        const squadCountForTeam1 = await teamsService.getSquadCount(team1.id);
        const squadCountForTeam2 = await teamsService.getSquadCount(team2.id);

        const isConflicting = await teamsService.validateSquadConflict(team1.id, team2.id);
        if (isConflicting) throw new AppError({ ...errors.ERR_INVALID_REQUEST_DATA, message: 'Conflicting teams' });

        if (squadCountForTeam1 < 11 || squadCountForTeam2 < 11) throw new AppError({ ...errors.ERR_INVALID_REQUEST_DATA, message: 'Squad not formed yet, please create a squad of atleast 11 plyers in each of the team' }); 
        const query = db.create(Match,
            {
                team_1: team1.id,
                team_2: team2.id,
                date: moment(date).utc().toDate(),
                venue
            });
        await db.persistAndFlush(query);
        return {
            match_id: query.id
        }
    }

    getMatches = async ({
        page,
        perPage,
        date,
        teamName,
        team1Name,
        team2Name
    }: {
        page: number,
        perPage: number,
        date?: Date,
        teamName?: string,
        team1Name?: string,
        team2Name?: string
    }) => {
        console.log({
            page,
            perPage,
            date,
            teamName,
            team1Name,
            team2Name
        })
        const offset = perPage * (page > 0 ? page - 1 : 0);
        let team1: Loaded<Team, never, "*", never> | null = null, team2: Loaded<Team, never, "*", never> | null = null, team: Loaded<Team, never, "*", never> | null = null;
        if (team1Name) {
            team1 = await teamsService.getTeamByName(team1Name);
        }
        if (team2Name) {
            team2 = await teamsService.getTeamByName(team2Name);
        }
        if (!(team1Name && team2Name) && teamName) {
            team = await teamsService.getTeamByName(teamName);
        }

        const where = this.buildGetMatchesQuery({
            team1,
            team2,
            team,
            date
        });
        const matches = await db.findAndCount(Match, where, {
            limit: perPage,
            offset,
            populate: ['team_1', 'team_2']
        });
        return {
            matches: matches[0].map((match) => ({ 
                ...match, 
                team_1: match.team_1.name, 
                team_2: match.team_2.name })),
            total: matches[1],
            per_page: perPage,
            page
        }
    }

    buildGetMatchesQuery = ({
        team1,
        team2,
        team,
        date
    }: {
        team1: Loaded<Team, never, "*", never> | null,
        team2: Loaded<Team, never, "*", never> | null,
        team: Loaded<Team, never, "*", never> | null,
        date?: Date
    }) => {
        const where: any = {
            $and: []
        };

        where.$and = [];
        if (team1) {
            where.$and.push({team_1: team1.id});
        }
        if (team2) {
            where.$and.push({team_2: team2.id});
        }
        if (!(team1 && team2) && team) {
            where.$and.push({
                $or: [
                    {
                        team_1: team.id
                    },
                    {
                        team_2: team.id
                    }
                ]
            })
        }
        if (date) {
            where.$and.push({ date: date });
        }
        return where;
    }

    getMatchDetails = async (matchId: number) => {
        const match = await db.findOne(Match, {
            id: matchId
        },
        {
            populate: ['team_1', 'team_2', 'team_1.squads', 'team_2.squads', 'team_1.squads.player', 'team_2.squads.player']
        });

        return {
            ...match,
            team_1: match?.team_1.name,
            team_2: match?.team_2.name,
            squads: {
                team_1: (match?.team_1 && match.team_1.squads as any).map((squad: Loaded<Squad, never, "*", never>) => ({
                    player: squad.player.id,
                    name: squad.player.name,
                    role: squad.role
                })),
                team_2: (match?.team_1 && match.team_2.squads as any).map((squad: Loaded<Squad, never, "*", never>) => ({
                    player: squad.player.id,
                    name: squad.player.name,
                    role: squad.role
                }))
            }
        };
    }

    updateMatch = async ({ status, date, matchId }: {
        status?: MatchStatus,
        date?: Date,
        matchId: number
    }) => {
        const match = await db.findOne(Match, {
            id: matchId
        });
        if (!match) throw new AppError({ ...errors.ERR_INVALID_REQUEST_DATA, message: 'Match does not exist' });
        if (status) {
            match.status = status;
        }
        if (date) {
            match.date = moment(date).utc().toDate();
        }
        await db.persistAndFlush(match);
    }
}

const matchService = new MatchService();
export default matchService;