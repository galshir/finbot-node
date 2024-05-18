import express, { RequestHandler } from 'express';
import { InitService } from '../../service/init';
import { createInitRoute } from './init';

export function createV1Router(
    initService: InitService,
) {
    const router = express.Router();

    function protect(type: Protection, path: string, handler: RequestHandler) {
        switch (type) {
            case Protection.OPEN:
                router.use(path, handler)
            default:
                break;
        }
    }
  
    protect(Protection.OPEN, '/init', createInitRoute(initService));
    return router;
}

enum Protection {
    OPEN
}