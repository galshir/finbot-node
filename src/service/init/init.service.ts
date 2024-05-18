import { Init, InitDao } from "../../dao/init";

export class InitService {
    constructor(
        private initDao: InitDao,
    ){}

    async getInit(): Promise<Init[] | null> {
        return null;
    }
    
}
