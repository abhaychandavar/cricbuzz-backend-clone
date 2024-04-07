import path from "path";
import appConfig from "./config/app";
import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from '@mikro-orm/migrations';
import entities from "./db/models";

const microOrmConfig = defineConfig ({
    extensions: [
        Migrator
    ],
    migrations: {
        path: path.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}'
    },
    entities: entities,
    dbName: appConfig.db.database,
    debug: appConfig.env !== 'PROD',
    port: appConfig.db.port,
    user: appConfig.db.user,
    password: appConfig.db.password
});

export default microOrmConfig;