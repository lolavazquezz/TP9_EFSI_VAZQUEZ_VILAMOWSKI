import config from '../configs/db-config.js';
import pkg from 'pg'
const { Client, Pool } = pkg;
export default class EventCategoryRepository {
    getAllCategories = async () => {
    let returnArray = [];
    const client = new Client(config);
    try {
        await client.connect();
        let sql = `SELECT * FROM public.event_categories`;
        const result = await client.query(sql);
        returnArray = result.rows;
        await client.end();
    } catch (error) {
        console.log(error);
        await client.end();
    }
    return returnArray;
}
getCategoryById = async (pid) => {
    let returnArray = null;
    const client = new Client(config);
    try {
        await client.connect();
        let sql = `SELECT * FROM public.event_categories WHERE id = ${pid}`;
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
createEventCategory = async (id, category, display) => {
    let returnArray = null;
    const client = new Client(config);
    try {
        await client.connect();
        if (!category ||category.length <= 2) {
            return "less";
        }
        else {
        let sql = `INSERT INTO public.event_categories (id, event_category_name, display_order) VALUES (${id}, '${category}', ${display})`;
        const result = await client.query(sql);
        await client.end();
        returnArray = "created";
        }
    } catch (error) {
        console.log(error);
        returnArray = "error";
    }
    return returnArray;
}
alterEventCategory = async (puser, pid, pevent_category_name) => {
    let returnArray = null;
    const client = new Client(config);
    try {
        await client.connect();
        let sql1 = `SELECT id FROM public.users WHERE username = ${puser}`;
        const res1 = await client.query(sql1);
        if (res1.rowCount === 0) {
            await client.end();
            return "notFound";
        }
        const pid_user = res1.rows[0].id;
        let sql2 = `SELECT id FROM public.event_categories WHERE id = ${pid}`;
        const res2 = await client.query(sql2);
        if (res2.rowCount === 0) {
            await client.end();
            return 404;
        }
        if (pevent_category_name && pevent_category_name.length <= 2) {
            await client.end();
            return "less";
        }
        let sql = `UPDATE public.event_categories SET event_category_name = ${pevent_category_name} WHERE id = ${pid}`;
        await client.query(sql);
        await client.end();
        returnArray = 200;
    } catch (error) {
        console.log(error);
        await client.end();
        returnArray = "error";
    }
    return returnArray;
}
deleteEventCategory = async (pid) => {
    let returnArray = null;
    const client = new Client(config);
    try {
        await client.connect();
            let sql2 = `SELECT id FROM public.event_categories WHERE id = ${pid}`;
            const res2_x = await client.query(sql2);
            if (res2_x.rowCount === 0) {
                await client.end();
                return 404;
            } else {
                let sql4 = `SELECT id FROM public.events WHERE id_event_category = ${pid}`;
                console.log(sql4);
                const res4_x = await client.query(sql4);
                let res4 = res4_x.rows[0].id;
                console.log(res4);
                let sql6 = `DELETE FROM public.event_enrollments WHERE id_event = ${res4}`;
                await client.query(sql6);
                let sql7 = `DELETE FROM public.event_tags WHERE id_event = ${res4}`;
                await client.query(sql7);
                let sql5 = `DELETE FROM public.events WHERE id_event_category = ${pid}`;
                await client.query(sql5);
                let sql = `DELETE FROM public.event_categories WHERE id = ${pid}`;
                await client.query(sql);
                await client.end();
                returnArray = "removed";
            }
        
    } catch (error) {
        console.log(error);
        await client.end();
        returnArray = "error";
    }
    return returnArray;
}
}