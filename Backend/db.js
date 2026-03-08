import dotenv from 'dotenv'
dotenv.config();
import mysql2 from 'mysql2/promise'
const pool = mysql2.createPool({
    host:process.env.DB_host,
    user:process.env.DB_user,
    database:process.env.DB_Name,
    password:process.env.DB_password,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})

export default pool; 