"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const users_1 = require("./db/models/users");
const app_1 = __importDefault(require("./config/app"));
const postgresql_1 = require("@mikro-orm/postgresql");
const migrations_1 = require("@mikro-orm/migrations");
const microOrmConfig = (0, postgresql_1.defineConfig)({
    extensions: [
        migrations_1.Migrator
    ],
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pathTs: path_1.default.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}'
    },
    entities: [users_1.User],
    dbName: app_1.default.db.database,
    debug: app_1.default.env !== 'PROD',
    port: app_1.default.db.port,
    user: app_1.default.db.user,
    password: app_1.default.db.password
});
exports.default = microOrmConfig;
//# sourceMappingURL=mikro-orm.config.js.map