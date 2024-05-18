
import express from 'express';
import cors from 'cors';
import { createMainRouter } from './routes';
import { InitService } from './service/init';
import { InitDao } from './dao/init';

export function createApp(daos: Daos) {
    const {
        initService,
    } = initServices(daos);

    const app = express();
    app.use(cors({origin: 'http://localhost:3000', credentials: true}));
    app.use(createMainRouter(initService));

    return app;
}

function initServices(daos: Daos) {
    const initService = new InitService(daos.initDao);

    return {
        initService,
    }
}

export type Daos = {
    initDao: InitDao;
}
