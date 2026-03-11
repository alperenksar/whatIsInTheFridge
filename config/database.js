const {Pool} = require("pg");
require("dotenv").config();

const _pool = new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
});


_pool.on('connect',() =>{
    console.log("Db connected succesfully!!!!");
});

module.exports = {
    query:(text,params) => _pool.query(text,params),
};