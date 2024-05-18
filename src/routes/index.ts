import express from 'express';
import { createV1Router } from './v1';
import { InitService } from '../service/init';

export function createMainRouter(
    initService: InitService,
) {
    const mainRouter = express.Router();    

    mainRouter.use('/v1', createV1Router(initService))
    return mainRouter;
}
