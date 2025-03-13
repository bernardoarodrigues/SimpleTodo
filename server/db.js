// Database configuration
const Pool = require("pg").Pool
const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DATABASEPORT,
    database: process.env.DATABASE
})
module.exports = pool