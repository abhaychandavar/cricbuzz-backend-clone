import { Player } from "../db/models/players";
import { db } from "../";
import AppError from "../utils/appError";
import errors from "../utils/errors";
import { dummyData } from "../utils/constants";
class PlayersService {
    createPlayer = async ({
        name
    }: {
        name: string,
    }) => {
        const query = db.create(Player,
            {
                name: name.trim(),
            });
        await db.persistAndFlush(query);
    }

    getPlayerByName = async (name: string) => {
        const player = await db.findOne(Player, {
            name
        });

        if (!player) return null;
        return player;
    }

    getPlayerStats = async (playerId: number) => {
        const player = await db.findOne(Player, {
            id: playerId
        });
        if (!player) throw new AppError({ ...errors.ERR_INVALID_REQUEST_DATA, message: 'Could not find player' });
        return {
            ...player,
            ...dummyData.player_stats,
            squads: undefined
        }
    }


}

const playersService = new PlayersService();
export default playersService;