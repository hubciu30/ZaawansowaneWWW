module.exports = (pool) =>{
    const Roles = {};

    // get all roles by user id 
    Roles.getByID = (id)=>{
        let sql_string = "SELECT * FROM `roles` WHERE `id`=?";
        let arguments = [id]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

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

    // delete object
    Roles.delete = {}
    // delete role by id
    Roles.delete.ByID = (id)=>{
        let sql_string = "DELETE FROM `roles` WHERE `id` = ?";
        let arguments = [id]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // delete roles by userID
    Roles.delete.ByUserID = (userID)=>{
        let sql_string = "DELETE FROM `roles` WHERE `user_id` = ?";
        let arguments = [userID]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    return Roles;
}