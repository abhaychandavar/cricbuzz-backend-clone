import { Squad, SquadRole } from "../db/models/squads";
import { db } from "../";
import { Team } from "../db/models/teams";
import playersService from "./players";
import AppError from "../utils/appError";
import errors from "../utils/errors";

class TeamsService {
    createTeam = async ({
        name
    }: {
        name: string,
    }) => {
        const query = db.create(Team,
            {
                name: name.trim(),
            });
        await db.persistAndFlush(query);
        return {
            team: query.id
        }
    }

    addPlayerToSquad = async ({
        playerName,
        role,
        teamId
    }: {
        playerName: string,
        role: SquadRole | Array<SquadRole>,
        teamId: number
    }) => {
        const player = await playersService.getPlayerByName(playerName);
        if (!player) throw new AppError({ ...errors.ERR_INVALID_REQUEST_DATA, message: 'No player exists with provided player name' });
        const query = db.create(Squad,
            {
                team: teamId,
                player: player.id,
                role: role instanceof Array ? role : [role]
            });
        await db.persistAndFlush(query);
        return {
            player: player.id,
        }
    }

    getTeamByName = async (name: string) => {
        const team = db.findOne(Team, {
            name
        });
        if (!team) return null;
        return team;
    }

    getSquadCount = async (teamId: number) => {
        const count = await db.count(Squad, {
            team: teamId
        });
        return count;
    }

    validateSquadConflict = async (team1Id: number, team2Id: number) => {
        const squad = await db.find(Squad, {
            team: team1Id
        },
        {
            fields: ['player']
        });

        const squad2 = await db.findOne(Squad, {
            player: {
                $in: squad.map((s) => s.player)
            },
            team: team2Id,
        });

        if (squad2) return true;
        return false;
    }
}

const teamsService = new TeamsService();
export default teamsService;