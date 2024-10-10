import config from '../configs/db-config.js';
import pkg from 'pg'
const { Client, Pool } = pkg;
export default class ProvinceRepository {
    getAllProvinces = async () => {
    let returnArray = null;
    const client = new Client(config);
    try {
        await client.connect();
        const sql = `SELECT * FROM public.provinces`;
        const result = await client.query(sql);
        await client.end();
        returnArray = result.rows;
    }
    catch (error) {
        console.log(error);
    }
    return returnArray;
}

getProvinceById = async (pid) => {
    let returnArray = null;
    const client = new Client(config);
    try {
        await client.connect();
        const sql = `SELECT * FROM public.provinces WHERE id = ${pid}`;
        const result = await client.query(sql);
        await client.end();
        returnArray = result.rows;
    }
    catch (error) {
        console.log(error);
    }
    return returnArray;
}

createProvince = async (pentity) => {
    let returnArray = null;
    const client = new Client(config);
    try {
        await client.connect();
        const sql = `INSERT INTO public.provinces (id, province_name, full_name, latitude, longitude, display_order) 
        VALUES ($1, $2, $3, $4, $5, $6)`;
        const result = await client.query(sql, [pentity.id, pentity.province_name, pentity.full_name, pentity.latitude, pentity.longitude, pentity.display_order]);
        await client.end();
        returnArray = "created";
    }
    catch (error) {
        if (!pentity.province_name){
            returnArray = "empty";
        }
        else if (pentity.province_name.length < 3){
            returnArray = "less";
        }
        else{
            returnArray = "error";
        }
        console.log(error);
    }
    return returnArray;
}

alterProvince = async (pentity) => {
    let returnArray = null;
    const client = new Client(config);
    try {
        await client.connect();
        if (pentity.id) {
            let sql = `UPDATE public.provinces SET `;
            if (pentity.province_name) {
                sql += `province_name = '${pentity.province_name}' `;
            }
            if (pentity.full_name) {
                sql += `full_name = '${pentity.full_name}' `;
            }
            if (pentity.latitude) {
                sql += `latitude = ${pentity.latitude} `;
            }
            if (pentity.longitude) {
                sql += `longitude = ${pentity.longitude} `;
            }
            if (pentity.display_order) {
                sql += `display_order = ${pentity.display_order} `;
            }
            sql += `WHERE id = ${pentity.id}`;
            const result = await client.query(sql);
            await client.end();
            returnArray = "modified";
        }
        else {
            returnArray = "notFound";
        }
    }
    catch (error) {
        if (pentity.province_name.length < 3){
            returnArray = "less";
        }
        else if (!pentity.province_name){
            returnArray = "empty";
        }
        else{
            returnArray = "error";
        }
        console.log(error);
    }
    return returnArray;
}

deleteProvince = async (pid) => {
    let returnArray = null;
    const client = new Client(config);
    try {
        await client.connect();
        const sql4 = `SELECT id FROM public.locations WHERE id_province = ${pid}`;
        const result4_x = await client.query(sql4);
        let result4 = result4_x.rows[0].id;
        console.log(result4);
        const sql6 = `SELECT id_location FROM public.event_locations WHERE id_location = ${result4}`;
        const result6_x = await client.query(sql6);
        let result6 = result6_x.rows[0].id_location;
        console.log("res6"+result6);
        const sql8= `SELECT id FROM public.events WHERE id_event_location = ${result6}`;
        const result8_x = await client.query(sql8);
        let result8 = result8_x.rows[0].id;
        console.log("res8"+result8);
        const sql12= `SELECT id_tag FROM public.event_tags WHERE id_event = ${result8}`;
        const result12_x = await client.query(sql12);
        console.log(sql12);
        console.log(result12_x);


        let result12 = result12_x.rows[0].id_tag;


       
        const sql5 = `DELETE FROM public.event_enrollments WHERE id_event = ${result8}`;
        await client.query(sql5);

        const sql7 = `DELETE FROM public.events WHERE id = ${result8}`;
        await client.query(sql7);
        const sql3 = `DELETE FROM public.event_locations WHERE id_location = ${result4}`;
        await client.query(sql3);
        const sql1 = `DELETE FROM public.locations WHERE id_province = ${pid}`;
        await client.query(sql1);
        
        const sql9 = `DELETE FROM public.event_tags WHERE id_tag = ${result12}`;
        await client.query(sql9);
        const sql10 = `DELETE FROM public.tags WHERE id = ${result12}`;
        await client.query(sql10);
        const sql2 = `DELETE FROM public.provinces WHERE id = ${pid}`;
        await client.query(sql2);

        await client.end();
        returnArray = 200;
    }
    catch (error) {
        returnArray = 404;
        console.log(error);
    }
    return returnArray;
}
}