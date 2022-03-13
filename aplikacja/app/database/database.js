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

// Session section
db.Session = {};
// get session by token
db.Session.get = (token) =>{
    let sql_string = "SELECT * FROM `sessions` WHERE `token`=?";
    let arguments = [token]
    return new Promise((resolve, reject) => {
        pool.query(sql_string, arguments, (error, data) =>{
            if(error){reject(error);}
            return resolve(data);
        })
    });
};
// create new session
db.Session.create = (userID, token, createTime, expireTime, ip, userAgent) =>{
    let sql_string = "INSERT INTO `sessions` (`id`, `user_id`, `token`, `create_time`, `expire_time`, `ip`, `user_agent`, `active`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?) ";
    let arguments = [userID, token, createTime, expireTime, ip, userAgent, 1];
    return new Promise((resolve, reject) => {
        pool.query(sql_string, arguments, (error, data) =>{
            if(error){reject(error);}
            return resolve(data);
        })
    });
}
// cancel session
db.Session.cancel = (token)=>{
    let sql_string = "UPDATE `sessions` SET `active`=? WHERE `token`=?";
    let arguments = [0, token]
    return new Promise((resolve, reject) => {
        pool.query(sql_string, arguments, (error, data) =>{
            if(error){reject(error);}
            return resolve(data);
        })
    });
}



module.exports = db