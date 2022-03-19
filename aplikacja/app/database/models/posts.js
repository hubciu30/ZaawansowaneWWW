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
        let sql_string = "SELECT * FROM `roles` WHERE `topic_id`=?";
        let arguments = [topicID]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    return Posts;
}