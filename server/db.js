// Database configuration
const Pool = require("pg").Pool
const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: "localhost",
    port: process.env.DATABASEPORT,
    database: process.env.DATABASE
})
module.exports = pool