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
    Topics.getByUserID = (userID)=>{
        let sql_string = "SELECT * FROM `topics` WHERE `user_id`=?";
        let arguments = [userID]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // create new topic
    Topics.create = (category_id, user_id, title, create_time) =>{
        let sql_string = 'INSERT INTO `topics` (`id`, `categorie_id`, `user_id`, `title`, `create_time`) VALUES (NULL, ?, ?, ?, ?)';
        let arguments = [category_id, user_id, title, create_time]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // Update object
    Topics.update = {};

    // Update title
    Topics.update.title = (id, title) =>{
        let sql_string = 'UPDATE `topics` SET `title` = ? WHERE `id` = ?';
        let arguments = [title, id]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    return Topics;
}
