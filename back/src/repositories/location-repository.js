import config from '../configs/db-config.js';
import pkg from 'pg'
const { Client, Pool } = pkg;
export default class LocationRepository {
    getAllLocations = async () => {
    let returnArray = [];
    const client = new Client(config);
    try {
        await client.connect();
        let sql = `SELECT * FROM public.locations`;
        const result = await client.query(sql);
        returnArray = result.rows;
        await client.end();
    } catch (error) {
        console.log(error);
        await client.end();
    }
    return returnArray;
}
getLocationById = async (pid) => {
    let returnArray = null;
    const client = new Client(config);
    try {
        await client.connect();
        let sql = `SELECT * FROM public.locations WHERE id = ${pid}`;
        const result = await client.query(sql);
        if (result.rowCount > 0) {
            returnArray = result.rows[0];
        } else {
            returnArray = 404;
        }
        await client.end();
    } catch (error) {
        console.log(error);
        await client.end();
    }
    return returnArray;
}
getLocationByProvinceId = async (pid) => {
    let returnArray = [];
    const client = new Client(config);
    try {
        await client.connect();
        let sql = `SELECT * FROM public.locations WHERE id_province = ${pid}`;
        const result = await client.query(sql);
        if (result.rowCount > 0) {
            returnArray = result.rows;
        } else {
            returnArray = 404;
        }
        await client.end();
    } catch (error) {
        console.log(error);
        await client.end();
    }
    return returnArray;
}
}