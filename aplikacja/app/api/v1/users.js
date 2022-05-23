const crypto = require('crypto');
const auth = require('../../middlewares/auth');
const privileges = require('../../middlewares/privileges');
module.exports = (app)=>
{
    app.get('/api/users', auth, privileges, async (req, res) =>
    {
        if(req.cache.islogged)
        {
            try
            {
                const db = require('../../database/database');
                let response = await db.Users.get();
                let data = []
                for(item of response){
                    const {id, username, create_time, last_login_time, reputation} = item;
                    data.push({id, username, create_time, last_login_time, reputation});
                }
                let new_data = []
                if(req.query.start && req.query.limit){
                    try{
                        new_data = data.slice(req.query.start, req.query.limit+req.query.start);
                    }catch{new_data = []}
                }
                else{
                    new_data = data;
                }

                res.status(200).json(new_data);
            }
            catch(e){
                console.log(e);
                res.sendStatus(500);
            }
        }
        else
        {
            res.sendStatus(403);
        }
    });

    app.get('/api/users/:id', auth, async (req, res) =>
    {
        if(req.cache.islogged)
        {
            try
            {
                const db = require('../../database/database');
                let response = await db.Users.getByID(req.params.id);
                if(response.length>0){
                    const {id, username, create_time, last_login_time, reputation} = response[0];
                    res.status(200).json({id, username, create_time, last_login_time, reputation});
                }
                else{
                    res.sendStatus(404);
                }
            }
            catch(e){
                console.log(e);
                res.sendStatus(500);
            }
        }
        else
        {
            res.sendStatus(403);
        }
    });

    app.post('/api/users', auth, privileges, async (req, res) =>{
        if(req.cache.islogged && req.cache.roles.length>0){
            const data = req.cache.roles?.find(item => item.name.toLowerCase()==="admin");
            if(data)
            {
                if(req.body.login && req.body.password && req.body.roleName && req.body.rolePower){
                    try
                    {
                        const db = require('../../database/database');
                        const salt = crypto.randomBytes(16).toString('hex');
                        const hash = crypto.createHash('sha256').update(req.body.password+salt).digest('hex');
                        const time = Date.now();
                        let response = await db.Users.getByUsername(req.body.login);
                        if(response.length === 0){
                            response = await db.query('INSERT INTO `users` (`id`, `username`, `password`, `salt`, `create_time`, `last_login_time`) VALUES (NULL, ?, ?, ?, ?, ?)', [req.body.login, hash, salt, time, 0,])
                            response = await db.query('INSERT INTO `roles` (`id`, `user_id`, `name`, `power`) VALUES (NULL, ?, ?, ?)', [response.insertId, req.body.roleName, req.body.rolePower]);
                            res.sendStatus(200);
                        }
                        else{
                            res.sendStatus(401); // login exist
                        }
                    }
                    catch(e){
                        console.log(e);
                        res.sendStatus(500);
                    }
                }
                else{
                    res.sendStatus(400);
                }
            }
            else
            {
                res.sendStatus(403);
            }
        }
        else
        {
            res.sendStatus(403);
        }
    });
}