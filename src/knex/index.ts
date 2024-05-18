
import { ClientDbConfig, getKnexConnection } from './db.knex';

export type AppuserDbDetails = {sqlServerName: string; databaseName: string; organizationId: string;};

export const getDb = (dbConfig?: ClientDbConfig, appUser?: AppuserDbDetails) => {
    // const {sqlServerName, databaseName} = appUser;
    // if(!sqlServerName || !databaseName) {
    //     return;
    // }

    // const dbDetails = {
    //     host: '',
    //     user: databaseName,
    //     database: databaseName
    // };
    //return getKnexConnection(dbDetails, dbConfig);
    return getKnexConnection();

}