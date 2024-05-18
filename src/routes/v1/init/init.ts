import express, { Request, Response } from 'express';
//import { ResponseDTO } from '../../../dto';
import { InitService } from '../../../service/init';

export function createInitRoute(initService: InitService) {
    const router = express.Router();

    router.get("/", async (req: Request, res: Response) => {
        //res.status(200).json(new ResponseDTO({test: 'asdasd'}));
    });

    return router;
}