import dotenv from 'dotenv';
import { createConnection, createPool } from 'mysql2/promise';

dotenv.config();

export const database = createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    port: process.env.PORT_DB,
    database: process.env.NAME_DB,
    charset: 'utf8mb4',
});