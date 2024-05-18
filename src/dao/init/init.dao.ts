import { Init, InitDao } from ".";
import { getDb } from "../../knex";

export class KnexInitDao implements InitDao {
    async getInit(): Promise<Partial<Init> | null> {
        return null;
    }
}
