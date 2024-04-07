import path from "path";
import { User } from "./db/models/users";
import appConfig from "./config/app";
import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from '@mikro-orm/migrations';

const microOrmConfig = defineConfig ({
    extensions: [
        Migrator
    ],
    migrations: {
        path: path.join(__dirname, './migrations'),
        pathTs: path.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}'
    },
    entities: [User],
    dbName: appConfig.db.database,
    debug: appConfig.env !== 'PROD',
    port: appConfig.db.port,
    user: appConfig.db.user,
    password: appConfig.db.password
});

export default microOrmConfig;