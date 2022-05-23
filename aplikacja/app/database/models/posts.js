module.exports = (pool) =>{
    const Posts= {};
    // get all posts
    Posts.get = ()=>{
        let sql_string = "SELECT * FROM `posts`";
        let arguments = []
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // get post by id
    Posts.getByID = (postID)=>{
        let sql_string = "SELECT * FROM `posts` WHERE `id`=?";
        let arguments = [postID]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // get all posts by user id
    Posts.getByUserID = (userID)=>{
        let sql_string = "SELECT * FROM `posts` WHERE `user_id`=?";
        let arguments = [userID]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // get all posts by topic id
    Posts.getByTopicID = (topicID)=>{
        let sql_string = "SELECT * FROM `posts` WHERE `topic_id`=?";
        let arguments = [topicID]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // create new post
    Posts.create = (user_id, topic_id, content, create_time) =>{
        let sql_string = 'INSERT INTO `posts` (`id`, `user_id`, `topic_id`, `content`, `create_time`) VALUES (NULL, ?, ?, ?, ?)';
        let arguments = [user_id, topic_id, content, create_time]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // Update object
    Posts.update = {};

    // Update content
    Posts.update.content = (id, content) =>{
        let sql_string = 'UPDATE `posts` SET `content` = ? WHERE `id` = ?';
        let arguments = [content, id]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // Update rating
    Posts.update.rating = (id, rating) =>{
        let sql_string = 'UPDATE `posts` SET `rating` = ? WHERE `id` = ?';
        let arguments = [rating, id]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    return Posts;
}