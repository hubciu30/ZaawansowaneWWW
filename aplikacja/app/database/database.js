const mysql = require('mysql2');

const {db_host, db_name, db_user, db_password} = require('../config');

const pool = mysql.createPool({
    connectionLimit: 10,
    host:db_host,
    database: db_name,
    user: db_user,
    password: db_password,
    //port: 3306
});

// main database object
let db = {};

// flexible query function
db.query = (sql_string, arguments) =>{
    return new Promise((resovle, reject) =>{
        pool.query(sql_string, arguments, (error, data)=>{
            if(error) {reject(error);}
            return resovle(data);
        });
    });
}

// Users section
db.Users = require('./models/users')(pool);

// Session section
db.Sessions = require('./models/sessions')(pool);

// Roles section
db.Roles = require('./models/roles')(pool);

// Categories section
db.Categories = require('./models/categories')(pool);

// Topics section
db.Topics = require('./models/topics')(pool);

// Posts section
db.Posts = require('./models/posts')(pool);

module.exports = db