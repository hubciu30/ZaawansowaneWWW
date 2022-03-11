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

// query function
db.query = (sql_string, arguments) =>{
    return new Promise((resovle, reject) =>{
        pool.query(sql_string, arguments, (error, data)=>{
            if(error) {reject(error);}
            return resovle(data);
        });
    });
}

// Users section
db.Users = {};

db.Users.get = (id, username) =>{
    let sql_string = "SELECT * FROM `users` WHERE ";
    let arguments = []
    if(id===null && username===null){
        sql_string = "SELECT * FROM `users`";
    }
    else
    {
        if(id){
            sql_string+="id=?";
            arguments.push(id);
        }
        if(username){
            if(sql_string[sql_string.length-1] === "?"){sql_string+=" AND ";}
            sql_string+="username=?";
            arguments.push(username);
        }
    }
    return new Promise((resolve, reject) => {
        pool.query(sql_string, arguments, (error, data) =>{
            if(error){reject(error);}
            return resolve(data);
        })
    });
} 


module.exports = db