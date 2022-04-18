const {Pool} = require("pg");
require("dotenv").config();

console.error(process.env.PGUSER,process.env.PGPASSWORD)

module.exports = new Pool({
    user:process.env.PGUSER,
    host:"localhost",
    database:"socialmedia",
    password:process.env.PGPASSWORD,
    port:5432
})