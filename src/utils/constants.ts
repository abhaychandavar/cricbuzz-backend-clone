import { SquadRole } from "../db/models/squads";

export const dummyData = {
    player_stats: {
        matches_played: 200,
        runs: 12000,
        average: 59.8,
        strike_rate: 92.5
    },
    players: {
        india: [
            {
                name: 'Virat Kohli',
                role: [SquadRole.BATSMAN, SquadRole.VICE_CAPTIAN]
            },
            {
                name: 'Rohit Sharma',
                role: [SquadRole.BATSMAN, SquadRole.CAPTIAN]
            },
            {
                name: 'Jasprit Bumrah',
                role: [SquadRole.BOWLER]
            },
            {
                name: 'Ravichandran Ashwin',
                role: [SquadRole.BOWLER]
            },
            {
                name: 'Ajinkya Rahane',
                role: [SquadRole.BATSMAN]
            },
            {
                name: 'KL Rahul',
                role: [SquadRole.BATSMAN]
            },
            {
                name: 'Rishabh Pant',
                role: [SquadRole.WICKET_KEEPER]
            },
            {
                name: 'Shikhar Dhawan',
                role: [SquadRole.BATSMAN]
            },
            {
                name: 'Hardik Pandya',
                role: [SquadRole.BATSMAN]
            },
            {
                name: 'Ishant Sharma',
                role: [SquadRole.BOWLER]
            },
            {
                name: 'Mohammed Shami',
                role: [SquadRole.BOWLER]
            }
        ],
        australia: [
            {
                name: 'Aaron Finch',
                role: [SquadRole.BATSMAN, SquadRole.CAPTIAN]
            },
            {
                name: 'David Warner',
                role: [SquadRole.BATSMAN]
            },
            {
                name: 'Steve Smith',
                role: [SquadRole.BATSMAN, SquadRole.VICE_CAPTIAN]
            },
            {
                name: 'Glenn Maxwell',
                role: [SquadRole.BATSMAN]
            },
            {
                name: 'Mitchell Marsh',
                role: [SquadRole.BATSMAN]
            },
            {
                name: 'Alex Carey',
                role: [SquadRole.WICKET_KEEPER]
            },
            {
                name: 'Pat Cummins',
                role: [SquadRole.BOWLER]
            },
            {
                name: 'Mitchell Starc',
                role: [SquadRole.BOWLER]
            },
            {
                name: 'Adam Zampa',
                role: [SquadRole.BOWLER]
            },
            {
                name: 'Josh Hazlewood',
                role: [SquadRole.BOWLER]
            },
            {
                name: 'Marcus Stoinis',
                role: [SquadRole.BATSMAN]
            }
        ]
        
    }
}