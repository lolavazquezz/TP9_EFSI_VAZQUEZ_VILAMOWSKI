import config from '../configs/db-config.js';
import pkg from 'pg'
const { Client, Pool } = pkg;
export default class EventLocationRepository {
    getAllEventLocations = async () => {
    let returnArray = [];
    const client = new Client(config);
    try {
        await client.connect();
        let sql = `SELECT * FROM public.event_locations`;
        const result = await client.query(sql);
        returnArray = result.rows;
        await client.end();
    } catch (error) {
        console.log(error);
        await client.end();
    }
    return returnArray;
}
getEventLocationById = async (pid) => {
    let returnArray = null;
    const client = new Client(config);
    try {
        await client.connect();
        let sql = `SELECT * FROM public.event_locations WHERE id = ${pid}`;
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
getLocationFromEventLocationById = async (pid) => {
    let returnArray = null;
    const client = new Client(config);
    try {
        await client.connect();
        let sql = `SELECT locations.* 
                   FROM public.event_locations 
                   INNER JOIN public.locations ON event_locations.id_location = locations.id 
                   WHERE event_locations.id = ${pid}`;
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
}