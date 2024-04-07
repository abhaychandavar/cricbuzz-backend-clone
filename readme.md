# Cricbuzz

## Assumptions
- Unique player name: As per the description Add team members to squad requires us to pass player name instead of player ID in request body
- Player and Teams are decoupled: Assuming same player can be added to different teams hence player is not tied up to a team (Example: A player can be part of international cricket team aswell as IPL team)
- Matches do not get scheduled unless teams do not conflict and each team has atleast 11 players
- Player statistics is static

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/abhaychandavar/cricbuzz-backend-clone.git
   ```
2. Run your postgreSql instance
3. Navigate to project directory and run:
   ```
   npm i
   ```
4. Setup your .env file at the root level according to `.env.sample` file
5. Run `npm run watch`
6. Open a new terminal
7. Run `npm run dev` in the new terminal
8. ## If you face any issue regarding migration while running, then stop `npm watch`, stop `npm run dev`, delete, `dist` folder, then tun `npm run watch` and `npm run dev` again, it should work fine (This is due to duplicate mikroOrm migration conflict with files generated in both dist and src, can be solved by editing microOrm config) ##
9. Import `cricbuzz-clone.postman_collection.json` file into your Postman
10. Setup an environment in postman with these variables:
   1. `baseUrl` - Initial value: `localhost:<PORT_VALUE_FROM_ENV>`, Current value: `<PORT_VALUE_FROM_ENV>`
   2. `access_token`
11. Voila! you are ready to go!


## Scripts
- `watch`: Watches for changes in TypeScript files and compiles them automatically using `tsc -w`
- `test`: Placeholder script for running tests
- `start`: Starts the application in production mode
- `dev`: Starts the application in development mode using `nodemon`

## Steps to run in development mode
- ```npm run watch```
- ```npm run dev```

## Steps to run in production mode
- ```npm run build```
- ```npm start```
