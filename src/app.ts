import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { KnexInitDao } from './dao/init/init.dao';
import { Daos, createApp } from '.';
export type ConfigDao = {
    appUrl: string;
}

buildServer({appUrl: 'url'});

async function buildServer(configDao: ConfigDao) {
    const daos = await initDao(configDao);

    const app = createApp(daos);

    // app.set('trust proxy', true);
    // app.use(json());
    // app.use(cookieParser());
    // app.use(cookieSession({signed: false}))

    // app.all('*', async (req: Request, res: Response) => {throw new NotFoundError();}); 
    // app.use(errorHandler);
    app.listen(4000, () => console.log('Listening on port 🦁 💹 🚀 4000!!!'));
}

async function initDao(config: ConfigDao): Promise<Daos> {
    const initDao = new KnexInitDao();

    return {
        initDao,
    }
}
