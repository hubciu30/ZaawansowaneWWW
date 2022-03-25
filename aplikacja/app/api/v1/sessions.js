const auth = require('../../middlewares/auth');
const privileges = require('../../middlewares/privileges');
module.exports = (app)=>
{
    app.get('/api/sessions', auth, privileges, async (req, res) =>
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


    app.delete('/api/sessions/:id', auth, privileges, async (req, res) =>
    {
        if(req.cache.islogged && req.cache.roles.length>0)
        {
            const data = req.cache.roles?.find(item => item.name.toLowerCase()==="admin");
            try{
                const db = require('../../database/database');
                let response = await db.Sessions.getByID(req.params.id);
                if(response.length === 1){
                    if(response[0].user_id === req.cache.user_id || data)
                    {
                        await db.Sessions.delete(req.params.id);
                        res.sendStatus(200);
                    }
                    else
                    {
                        res.sendStatus(403);
                    }
                }
                else
                {
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
}