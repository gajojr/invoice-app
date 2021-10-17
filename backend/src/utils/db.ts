import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// must convert port to number, or else it will throw an error
const port: number = parseInt(<string>process.env.DB_PORT)

const pool = new Pool({
    host: process.env.DB_HOST,
    port,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

export default pool;