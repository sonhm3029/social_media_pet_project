const {Pool} = require("pg");
require("dotenv").config();

console.error(process.env.PGUSER,process.env.PGPASSWORD)


module.exports = new Pool({
    // user:process.env.PGUSER,
    // host:process.env.PGHOST,
    // database:process.env.PGDATABASE,
    // password:process.env.PGPASSWORD,
    // port:5432
    connectionString:process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})