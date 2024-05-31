import dotenv from 'dotenv';
import { createConnection } from 'mysql2/promise';

dotenv.config();

export const database = createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    port: process.env.PORT_DB,
    database: process.env.NAME_DB,
});