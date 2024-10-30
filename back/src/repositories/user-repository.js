import config from '../configs/db-config.js';
import pkg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { Client } = pkg;
const JWT_SECRET = 'topsecret'; 

export default class UserRepository {
    getAllUsuarios = async () => {
        let answer = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `
                SELECT * 
                FROM public.users
            `;
            const result = await client.query(sql);
            await client.end();
            answer = result.rows;
        } catch (error) {
            console.log(error);
        }
        return answer;
    }
    async createUser(pentity) {
        let answer = null;
        const client = new Client(config);
        try {
            await client.connect();

            const { username, first_name, last_name, password } = pentity; 
            if (!username || !first_name || !last_name || !password ) {
                answer = "faltanCampos";
                await client.end();
                return answer;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = `
                INSERT INTO users (username, first_name, last_name, password)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `;
            const values = [username, first_name, last_name, hashedPassword];
            const result = await client.query(sql, values);

            if (result.rows.length > 0) {
                answer = result.rows;
            } else {
                answer = "error";
            }
            await client.end();
        } catch (error) {
            console.log('Error en createUser:', error);
            answer = "error";
        }
        return answer;
    }

    async authenticateUser(username, password) {
        let user = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = 'SELECT * FROM users WHERE username = $1';
            const result = await client.query(sql, [username]);
            user = result.rows[0];
            if (user && await bcrypt.compare(password, user.password)) {
                await client.end();
                return user;
            }
            await client.end();
            return null;
        } catch (error) {
            console.error(error);
        }
        return null;
    }
    getUserById = async (userId) => {
        let user = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = 'SELECT * FROM users WHERE id = $1';
            const result = await client.query(sql, [userId]);
            user = result.rows[0];
            await client.end();
        } catch (error) {
            console.error('Error en getUserById:', error);
        }
        return user;
    }
}
