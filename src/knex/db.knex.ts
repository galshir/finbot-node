import knex, { Knex } from "knex";
import moment from "moment";
require('dotenv').config({path: '.env'});

export type ConnectionDetails = {
    host: string;
    user: string;
    database: string;
}

export type ClientDbConfig = {
    dbPassword: string;
    environment: string;
}

const times: { [uid: string]: { startTime: number, finished: boolean, endTime?: number } } = {};

export const getKnexConnection = (
    connectionDetails?: ConnectionDetails,
    DbConfig?: ClientDbConfig
) => {
    const config: Knex.Config = {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',//connectionDetails.user,
            port: 3306,
            password: '',
            database:'dev.stocksmood', //connectionDetails.database,
            timezone: 'UTC',
            options: {
                enableArithAbort: true,
            }
        },
        pool: {
            min: 0,
            max: 200,
            idleTimeoutMillis: 1000.
        }
    }

    return knex(config)
    .on('query', (query: KnexQuery) => {
        registerQuery(query);
    })
    // .on('query-response', (_queryResults, queryObject: KnexLog) => {
    //     const elapsedTime = getElapedTimeAndRemove(queryObject);
    //     logDataBase(queryObject.sql, queryObject.bindings, elapsedTime, appUser)
    // })
    // .on('query-error', (err, queryObject: KnexLog) => {
    //     const elapsedTime = getElapedTimeAndRemove(queryObject);

    // })

}

type KnexLog = {
    __knexQueryUid: string;
    bindings: any[];
    cancelOnTimeout: boolean;
    method: string;
    options: any;
    sql: string;
    timeout: boolean;
}

type KnexQuery = {
    __knexUid: string;
    __knexTxId: string | undefined;
    method: string;
    options: {};
    timeout: boolean;
    cancelOnTimeout: boolean;
    bindings: [string | number];
    __knexQueryUid: string;
    sql: string;
    queryContext: string | undefined;
}

function registerQuery(query: KnexQuery) {
    const uid = query.__knexQueryUid;
    times[uid] = {
        startTime: Date.now(),
        finished: false,
    };
}

function getElapedTimeAndRemove(queryObject: KnexLog) {
    const uid = queryObject.__knexQueryUid;
    times[uid].endTime = Date.now();
    times[uid].finished = true;
    const {startTime, endTime} = times[uid];
    const elapsedTime = endTime! - startTime;
    delete times[uid];
    return elapsedTime;
}