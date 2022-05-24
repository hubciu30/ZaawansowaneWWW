const auth = require('../../middlewares/auth');
const privileges = require('../../middlewares/privileges');
module.exports = (app)=>
{
    app.get('/api/topics', auth, privileges, async (req, res) =>
    {
        if(req.cache.islogged && req.cache.roles.length>0)
        {
            try
            {
                const db = require('../../database/database');
                let response = await db.Topics.get();
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

    app.get('/api/topics/:id', auth, async (req, res) =>
    {
        if(req.cache.islogged)
        {
            try
            {
                const db = require('../../database/database');
                let response = await db.Topics.getByID(req.params.id);
                if(response.length>0){
                    let posts = await db.Posts.getByTopicID(req.params.id);
                    let ans = [];
                    for(let item of posts){
                        ans.push(req.protocol +"://"+req.get('host')+"/api/posts/"+item.id);
                    }
                    let ans_data = response[0];
                    ans_data.posts = ans; 
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

    app.post('/api/topics', auth, privileges, async (req, res) =>
    {
        if(req.cache.islogged && req.cache.roles.length>0)
        {
            const data = req.cache.roles?.find(item => item.power > 0);
            if(data)
            {
                if(req.body.categorie_id && req.body.title)
                {
                    try
                    {
                        const db = require('../../database/database');
                        let response = await db.Categories.getByID(req.body.categorie_id);
                        if(response.length === 0){
                            res.sendStatus(401);
                        }
                        else{
                            await db.Topics.create(req.body.categorie_id, req.cache.user_id, req.body.title, Date.now());
                            await db.query('UPDATE `categories` SET `topics_count` = topics_count + 1 WHERE `id`=?',[req.body.categorie_id]);
                            res.sendStatus(201);
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

    app.patch('/api/topics/:id', auth, privileges, async (req, res) =>
    {
        if(req.cache.islogged && req.cache.roles.length>0)
        {
            const data = req.cache.roles?.find(item => item.power > 0);
            if(data)
            {
                if(req.body.title)
                {
                    try
                    {
                        const db = require('../../database/database');
                        let response = await db.Topics.getByID(req.params.id);
                        if(response.length === 0){
                            res.sendStatus(404);
                        }
                        else if(response[0].user_id === req.cache.user_id || data.power >= 50){ // autor tematu albo ktos z ranga moderatora lub wiecej
                            await db.Topics.update.title(req.params.id, req.body.title);
                            res.sendStatus(204);
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