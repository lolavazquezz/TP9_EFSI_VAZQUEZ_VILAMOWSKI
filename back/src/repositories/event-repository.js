import config from '../configs/db-config.js';
import pkg from 'pg'
const { Client, Pool } = pkg;
export default class EventRepository {
    getAllEvents = async () => {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `
                SELECT DISTINCT ON (e.id) 
                    e.id,
                    e.event_name,
                    e.description,
                    ec.event_category_name as event_category,
                    el.event_location_name as event_location,
                    u.id as id_creator_user,
                    u.first_name as creator_name,
                    e.start_date,
                    e.duration_in_minutes,
                    e.price,
                    e.enabled_for_enrollment,
                    e.max_assistance
                FROM 
                    public.events e
                INNER JOIN 
                    public.event_categories ec ON e.id_event_category = ec.id
                INNER JOIN 
                    public.event_locations el ON e.id_event_location = el.id_location
                INNER JOIN 
                    public.users u ON e.id_creator_user = u.id
            `;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    
    getEvent = async (pname, pcategory, pdate, ptag) => {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            let sql = `SELECT *, ec.event_category_name, t.tag_name
            FROM public.events e
            INNER JOIN public.event_categories ec ON e.id_event_category = ec.id
            INNER JOIN public.event_tags et ON e.id = et.id_event
            INNER JOIN public.tags t ON et.id_tag = t.id
            WHERE `;
            if (pname){
                sql += `event_name = ${pname} AND `;
            }
            if (pcategory){
                sql += `event_category_name = ${pcategory} AND `;
            }
            if (pdate){
                sql += `start_date = ${pdate} AND `;
            }
            if (ptag){
                sql += `tag_name = ${ptag} AND `;
            }
            sql = sql.slice(0, -5);
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        }
        catch (error) {
            console.log(error);   
        }
        return returnArray;
    }
    getEventById = async (pid) => {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM public.events WHERE id = ${pid}`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    getParticipants = async (pentity, pid) => {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            let sql = `SELECT users.first_name, users.last_name, users.username, event_enrollments.attended, event_enrollments.description, event_enrollments.rating 
                        FROM public.event_enrollments 
                        INNER JOIN public.users ON event_enrollments.id_user = users.id 
                        WHERE event_enrollments.id_event = ${pid}`;
            if (pentity) {
                if (pentity.first_name) {
                    sql += ` AND users.first_name = '${pentity.first_name}'`;
                }
                if (pentity.last_name) {
                    sql += ` AND users.last_name = '${pentity.last_name}'`;
                }
                if (pentity.username) {
                    sql += ` AND users.username = '${pentity.username}'`;
                }
                if (pentity.attended) {
                    sql += ` AND event_enrollments.attended = ${pentity.attended}`;
                }
                if (pentity.rating) {
                    sql += ` AND event_enrollments.rating > ${pentity.rating}`;
                }
                const result = await client.query(sql);
                await client.end();
                returnArray = result.rows;
            }
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    createEvent = async (pentity) => {
        let returnArray = null;
        const client = new Client(config);
        try {
            console.log(pentity);
            await client.connect();
            const sql = `INSERT INTO public.events (id, event_name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
            const result = await client.query(sql, [pentity.id, pentity.event_name, pentity.description, pentity.id_event_category, pentity.id_event_location, pentity.start_date, pentity.duration_in_minutes, pentity.price, pentity.enabled_for_enrollment, pentity.max_assistance, pentity.id_creator_user]);
            await client.end();
            returnArray = "created";
        }
        catch (error) {
            if (!pentity.event_name || !pentity.description || !pentity.id_event_category || !pentity.id_event_location || !pentity.start_date || !pentity.duration_in_minutes || !pentity.price || !pentity.enabled_for_enrollment || !pentity.max_assistance || !pentity.id_creator_user){
                returnArray = "empty";
            }
            else {
                returnArray = "error";
            }
            console.log(error);
        }
        return returnArray;
    }

    alterEvent = async (puser, pname, pentity) => {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            console.log(puser);
            let sql1 = `SELECT id from public.users WHERE username = $1`;
                const user = await client.query(sql1, [puser]);
                console.log(user.rows[0].id);
                let pid = user.rows[0].id;
                if (pid){
                    let sql = `UPDATE public.events SET `;
                    if (pentity.description) {
                        sql += `description = '${pentity.description}'`;
                    }
                    if (pentity.id_event_category) {
                        sql += `id_event_category = ${pentity.id_event_category} `;
                    }
                    if (pentity.id_event_location) {
                        sql += `id_event_location = ${pentity.id_event_location} `;
                    }
                    if (pentity.start_date) {
                        sql += `start_date = ${pentity.start_date} `;
                    }
                    if (pentity.duration_in_minutes) {
                        sql += `duration_in_minutes = ${pentity.duration_in_minutes} `;
                    }
                    if (pentity.price) {
                        sql += `price = ${pentity.price} `;
                    }
                    if (pentity.enabled_for_enrollment) {
                        sql += `enabled_for_enrollment = ${pentity.enabled_for_enrollment} `;
                    }
                    if (pentity.max_assistance) {
                        sql += `max_assistance = ${pentity.max_assistance} `;
                    }
                    sql += ` WHERE id_creator_user = ${pid} AND event_name = '${pname}'`;
                    console.log(sql);
                    const result = await client.query(sql);
                    await client.end();
                    returnArray = "modified";
                }
        }
        catch (error) {
            returnArray = "notFound";
            console.log(error);
        }
        return returnArray;
    }

    deleteEvent = async (puser, pname) => {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            let sql1 = `SELECT id from public.users WHERE username = '${puser}'`
            const user = await client.query(sql1);    
            let pid = user.rows[0].id;
            console.log(pid);
            const sql = `DELETE FROM public.events WHERE id_creator_user = ${pid} AND event_name = '${pname}'`;
            const result = await client.query(sql);
            returnArray = "deleted";
            await client.end();
        }
        catch (error) {
            returnArray = "error";
            console.log(error);
        }
        return returnArray;
    }

    enrollUser = async (pid, puser, pentity) => {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            let sql1 = `SELECT enabled_for_enrollment from public.events WHERE id = ${pid}`
            const enabled_x = await client.query(sql1);
            let enabled = enabled_x.rows[0].enabled_for_enrollment;

            console.log(sql1);
            let sql2 = `SELECT id from public.users WHERE username = '${puser}'`
            const pid_user_x = await client.query(sql2);
            let pid_user = pid_user_x.rows[0].id;
            console.log(pid_user);
            if (pid && enabled && pid_user){
                const sql = `INSERT INTO public.event_enrollments (id_event, id_user, description, 
                registration_date_time, attended, observations, rating) VALUES (${pid}, ${pid_user}, '${pentity.description}', '${pentity.registration_date_time}'
                , ${pentity.attended}, '${pentity.observations}' , ${pentity.rating})`;
                const result = await client.query(sql);
                console.log(sql, result);
                await client.end();
                returnArray = "enrolled";
            }
            else if (!enabled){
                returnArray = "exceeded";
            }
            else {
                returnArray = "notFound";
            }
        }
        catch (error) {
            returnArray = "error";
            console.log(error);
        }
        return returnArray;
    }

    removeUser = async (pid, puser) => {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            let sql1 = `SELECT id FROM public.users WHERE username = ${puser}`;
            const res1 = await client.query(sql1);
            if (res1.rowCount === 0) {
                await client.end();
                return "notRegistered";
            }
            const pid_user = res1.rows[0].id;
            let sql2 = `SELECT id, start_date, (start_date + interval '1 minute' * duration_in_minutes) AS end_date 
                        FROM public.events WHERE id = ${pid}`;
            const res2 = await client.query(sql2);
            if (res2.rowCount === 0) {
                await client.end();
                return "notFound";
            }
            const event = res2.rows[0];
            const now = new Date();
            const startDate = new Date(event.start_date);
            const endDate = new Date(event.end_date);
            if (now >= startDate || now >= endDate) {
                await client.end();
                return "pastEvent";
            }
            let sql3 = `SELECT id FROM public.event_enrollments WHERE id_user = ${pid_user} AND id_event = ${pid}`;
            const res3 = await client.query(sql3);
            if (res3.rowCount === 0) {
                await client.end();
                return "notRegistered";
            }
            let sql4 = `DELETE FROM public.event_enrollments WHERE id_user = ${pid_user} AND id_event = ${pid}`;
            await client.query(sql4);
            await client.end();
            returnArray = "removed";
        } catch (error) {
            console.log(error);
            await client.end();
            returnArray = "error";
        }
        return returnArray;
    }
    rateEvent = async (pid, puser, prating) => {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            let sql1 = `SELECT id FROM public.users WHERE username = ${puser}`;
            const res1 = await client.query(sql1);
            if (res1.rowCount === 0) {
                await client.end();
                return "notRegistered";
            }
            const pid_user = res1.rows[0].id;
            let sql2 = `SELECT id, start_date, (start_date + interval '1 minute' * duration_in_minutes) AS end_date 
                        FROM public.events WHERE id = ${pid}`;
            const res2 = await client.query(sql2);
            if (res2.rowCount === 0) {
                await client.end();
                return "notFound";
            }
            const event = res2.rows[0];
            const now = new Date();
            const endDate = new Date(event.end_date);
            if (now < endDate) {
                await client.end();
                return "ongoingEvent";
            }
            if (prating < 1 || prating > 10) {
                await client.end();
                return "notInRange";
            }
            let sql3 = `SELECT id FROM public.event_enrollments WHERE id_user = ${pid_user} AND id_event = ${pid}`;
            const res3 = await client.query(sql3);
            if (res3.rowCount === 0) {
                await client.end();
                return "notRegistered";
            }
            let sql4 = `UPDATE public.event_enrollments SET rating = ${prating} WHERE id_user = ${pid_user} AND id_event = ${pid}`;
            await client.query(sql4);
            await client.end();
            returnArray = "rated";
        } catch (error) {
            console.log(error);
            await client.end();
            returnArray = "error";
        }
        return returnArray;
    }
}