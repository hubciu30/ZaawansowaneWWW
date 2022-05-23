const auth = require('../../middlewares/auth');
const privileges = require('../../middlewares/privileges');
module.exports = (app)=>
{
    app.get('/api/categories', auth, privileges, async (req, res) =>
    {
        if(req.cache.islogged && req.cache.roles.length>0)
        {
            try
            {
                const db = require('../../database/database');
                let response = await db.Categories.get();
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

    app.get('/api/categories/:id', auth, async (req, res) =>
    {
        if(req.cache.islogged)
        {
            try
            {
                const db = require('../../database/database');
                let response = await db.Categories.getByID(req.params.id);
                if(response.length>0){
                    let topics = await db.Topics.getByCategorieID(req.params.id);
                    let ans = [];
                    for(let item of topics){
                        ans.push(req.protocol +"://"+req.get('host')+"/api/topics/"+item.id);
                    }
                    let ans_data = response[0];
                    ans_data.topics = ans; 
                    res.status(200).json(ans_data);
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

    app.post('/api/categories', auth, privileges, async (req, res) =>
    {
        if(req.cache.islogged && req.cache.roles.length>0)
        {
            const data = req.cache.roles?.find(item => item.name.toLowerCase()==="admin");
            if(data)
            {
                if(req.body.name)
                {
                    try
                    {
                        const db = require('../../database/database');
                        let response = await db.Categories.getByName(req.body.name);
                        if(response.length === 0){
                            response = await db.Categories.create(req.body.name, Date.now(), null);
                            res.sendStatus(200);
                        }
                        else{
                            res.sendStatus(401);
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

    app.patch('/api/categories/:id', auth, privileges, async (req, res) =>
    {
        if(req.cache.islogged && req.cache.roles.length>0)
        {
            const data = req.cache.roles?.find(item => item.name.toLowerCase()==="admin");
            if(data)
            {
                if(req.body.name)
                {
                    try
                    {
                        const db = require('../../database/database');
                        let response = await db.Categories.getByID(req.params.id);
                        if(response.length === 1){
                            response = await db.Categories.update.name(req.params.id, req.body.name);
                            res.sendStatus(200);
                        }
                        else{
                            res.sendStatus(404);
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