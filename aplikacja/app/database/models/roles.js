module.exports = (pool) =>{
    const Roles = {};
    // get all roles by user id 
    Roles.getByUserID = (userID)=>{
        let sql_string = "SELECT * FROM `roles` WHERE `user_id`=?";
        let arguments = [userID]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // get all roles by name
    Roles.getByName = (name)=>{
        let sql_string = "SELECT * FROM `roles` WHERE `name`=?";
        let arguments = [name]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    return Roles;
}