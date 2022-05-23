const auth = require('../../middlewares/auth');
const privileges = require('../../middlewares/privileges');
module.exports = (app)=>
{
    app.get('/api/posts', auth, privileges, async (req, res) =>
    {
        if(req.cache.islogged && req.cache.roles.length>0)
        {
            try
            {
                const db = require('../../database/database');
                let response = await db.Posts.get();

                if(req.query.from && req.query.to){
                    response = response.filter(item => item.create_time > req.query.from && item.create_time < req.query.to);
                }

                res.status(200).json(response);
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

    app.get('/api/posts/:id', auth, async (req, res) =>
    {
        if(req.cache.islogged)
        {
            try
            {
                const db = require('../../database/database');
                let response = await db.Posts.getByID(req.params.id);
                if(response.length>0){
                    res.status(200).json(response[0]);
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

    app.post('/api/posts', auth, privileges, async (req, res) =>
    {
        if(req.cache.islogged && req.cache.roles.length>0)
        {
            const data = req.cache.roles?.find(item => item.power > 0);
            if(data)
            {
                if(req.body.topic_id && req.body.content)
                {
                    try
                    {
                        const db = require('../../database/database');
                        let response = await db.Topics.getByID(req.body.topic_id);
                        if(response.length === 0){
                            res.sendStatus(401);
                        }
                        else{
                            const time = Date.now();
                            await db.Posts.create(req.cache.user_id, req.body.topic_id, req.body.content, time);
                            await db.query('UPDATE `topics` SET `posts_count` = posts_count + 1 WHERE `id`=?',[req.body.topic_id]);
                            const categorie_id = response[0].categorie_id;
                            await db.query('UPDATE `categories` SET `last_post_time`=? WHERE `id`=?',[time, categorie_id]);
                            res.sendStatus(200);
                        }
                    }
                    catch(e){
                        console.log(e);
                        res.sendStatus(500);
                    }
                }else{
                    res.sendStatus(400);
                }
            }else{
                res.sendStatus(403);
            }
        }
        else
        {
            res.sendStatus(403);
        }
    });

    app.patch('/api/posts/:id', auth, privileges, async (req, res) =>
    {
        if(req.cache.islogged && req.cache.roles.length>0)
        {
            const data = req.cache.roles?.find(item => item.power > 0);
            if(data)
            {
                if(req.body.content)
                {
                    try
                    {
                        const db = require('../../database/database');
                        let response = await db.Posts.getByID(req.params.id);
                        if(response.length === 0){
                            res.sendStatus(404);
                        }
                        else if(response[0].user_id === req.cache.user_id) {
                            db.Posts.update.content(req.params.id, req.body.content)
                            res.sendStatus(200);
                        }
                        else{
                            res.sendStatus(403);
                        }
                    }
                    catch(e){
                        console.log(e);
                        res.sendStatus(500);
                    }
                }else{
                    res.sendStatus(400);
                }
            }else{
                res.sendStatus(403);
            }
        }
        else
        {
            res.sendStatus(403);
        }
    });
}