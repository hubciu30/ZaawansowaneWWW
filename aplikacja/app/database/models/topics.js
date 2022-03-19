module.exports = (pool) =>{
    const Topics = {};

    // get all topics
    Topics.get = ()=>{
        let sql_string = "SELECT * FROM `topics`";
        let arguments = []
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // get topic by id
    Topics.getByID = (topicID)=>{
        let sql_string = "SELECT * FROM `topics` WHERE `id`=?";
        let arguments = [topicID]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // get topics by userID
    Topics.getByID = (userID)=>{
        let sql_string = "SELECT * FROM `topics` WHERE `user_id`=?";
        let arguments = [userID]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    return Topics;
}
