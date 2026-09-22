const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const connectDb = async () => {
    try {
        const query = await pool.query('Select * from users');
        console.log(query.rows[0]);
        console.log('We ran it successfully')
    } catch (error) {
        console.log('Something went wrong during connecting to db')
    }
}

connectDb();

module.exports = pool;
