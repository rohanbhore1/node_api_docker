import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const DB_PORT = Number(process.env.DB_PORT) || 3306;
const DB_HOST= process.env.DB_HOST || 'localhost'
const DB_USER= process.env.DB_USER ||'root'
const DB_PASSWORD= process.env.DB_PASSWORD ||'letmein'
const DB_NAME= process.env.DB_NAME ||'zip_challenge'
const DB_CONNECTION_LIMIT =  Number(process.env.DB_CONNECTION_LIMIT) || 20

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port:DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: DB_CONNECTION_LIMIT
});

export default pool;
