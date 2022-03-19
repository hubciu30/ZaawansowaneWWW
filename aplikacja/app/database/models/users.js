module.exports = (pool) =>{
    const Users = {}

    // get all users
    Users.get = () =>{
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM `users`", (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }
    
    // get user by usesID
    Users.getByID = (userID) =>{
        let sql_string = "SELECT * FROM `users` WHERE id=?";
        return new Promise((resolve, reject) => {
            pool.query(sql_string, [userID], (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    } 
    
    // get user by username
    Users.getByUsername = (username) =>{
        let sql_string = "SELECT * FROM `users` WHERE username=?";
        return new Promise((resolve, reject) => {
            pool.query(sql_string, [username], (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    } 
    return Users;
}