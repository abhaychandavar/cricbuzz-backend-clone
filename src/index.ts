import microOrmConfig from './mikro-orm.config';
import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
import express from 'express';
import appConfig from './config/app';
import indexRouter from './routes';

export let db: EntityManager;
const initDb = async () => {
    const orm = await MikroORM.init(microOrmConfig);
    orm.getMigrator().up();
    db = orm.em.fork();
}

const start = async () => {
    await initDb();

    const app = express();

    app.use(express.json());
    app.use(indexRouter);

    app.listen(appConfig.port, () => {
        console.log(`App started and listening to ${appConfig.port}`);
    })
};

start().catch((error) => {
    console.log('ERROR', error);
});