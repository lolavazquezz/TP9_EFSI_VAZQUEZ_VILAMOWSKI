import config from '../configs/db-config.js';
import pkg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { Client } = pkg;
const JWT_SECRET = 'topsecret'; 

export default class UserRepository {

    logUser = async (pentity) => {
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT id, password FROM public.users WHERE username = '${pentity.username}'`;
            const result = await client.query(sql);
            await client.end();

            const user = result.rows[0];
            const passwordMatch = await bcrypt.compare(pentity.password, user.password);

            if (!passwordMatch) {
                return { success: false, message: 'Usuario o clave inválida.', token: '' };
            }

            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
            console.log(token);

            return { success: true, message: '', token };
        } catch (error) {
            console.error('Error en loginUser:', error);
            return { success: false, message: 'Error en el servidor.', token: '' };
        }
    }

    createUser = async (pentity) => {
        const client = new Client(config);
        try {
            await client.connect();

            if (pentity.first_name.length < 3 || pentity.last_name.length < 3) {
                return { success: false, message: 'Los campos first_name o last_name deben tener al menos tres (3) letras.', token: '' };
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(pentity.username)) {
                return { success: false, message: 'El email es inválido.', token: '' };
            }

            if (pentity.password.length < 3) {
                return { success: false, message: 'El campo password debe tener al menos tres (3) letras.', token: '' };
            }

            const hashedPassword = await bcrypt.hash(pentity.password, 10);

            const sql = `INSERT INTO public.users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)`;
            await client.query(sql, [pentity.first_name, pentity.last_name, pentity.username, hashedPassword]);
            await client.end();

            return { success: true, message: 'Usuario creado satisfactoriamente.', token: '' };
        } catch (error) {
            console.error('Error en registerUser:', error);
            return { success: false, message: 'Error en el servidor.', token: '' };
        }
    }
}
