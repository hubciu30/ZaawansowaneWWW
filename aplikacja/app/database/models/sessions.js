module.exports = (pool) =>{
    const Sessions = {};

    // get sessions by id
    Sessions.getByID = (id) =>{
        let sql_string = "SELECT * FROM `sessions` WHERE `id`=?";
        let arguments = [id]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    };

    // get sessions by userID
    Sessions.getByUserID = (userID) =>{
        let sql_string = "SELECT * FROM `sessions` WHERE `user_id`=?";
        let arguments = [userID]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    };

    // get session by token
    Sessions.getByToken = (token) =>{
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
    Sessions.create = (userID, token, createTime, expireTime, ip, userAgent) =>{
        let sql_string = "INSERT INTO `sessions` (`id`, `user_id`, `token`, `create_time`, `expire_time`, `ip`, `user_agent`, `active`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?) ";
        let arguments = [userID, token, createTime, expireTime, ip, userAgent, 1];
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }
    // cancel session by token
    Sessions.cancel = (token)=>{
        let sql_string = "UPDATE `sessions` SET `active`=? WHERE `token`=?";
        let arguments = [0, token]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // cancel all active sessions
    Sessions.cancelAll = ()=>{
        let sql_string = "UPDATE `sessions` SET `active`=? WHERE `active`=?";
        let arguments = [0, 1];
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // delete session by id
    Sessions.delete = (id) => {
        let sql_string =  "DELETE FROM sessions WHERE `sessions`.`id` = ?";
        let arguments = [id]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    return Sessions;
}