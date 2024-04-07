"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const postgresql_1 = require("@mikro-orm/postgresql");
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./config/app"));
const routes_1 = __importDefault(require("./routes"));
const initDb = async () => {
    const orm = await postgresql_1.MikroORM.init(mikro_orm_config_1.default);
    orm.getMigrator().up();
    exports.db = orm.em.fork();
};
const start = async () => {
    await initDb();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(routes_1.default);
    app.listen(app_1.default.port, () => {
        console.log(`App started and listening to ${app_1.default.port}`);
    });
};
start().catch((error) => {
    console.log('ERROR', error);
});
//# sourceMappingURL=index.js.map