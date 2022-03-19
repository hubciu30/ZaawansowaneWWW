const auth = require('../../middlewares/auth');
const privileges = require('../../middlewares/privileges');
module.exports = (app)=>
{
    app.get('/users', auth, privileges, async (req, res) =>
    {
        if(req.cache.islogged && req.cache.roles.length>0)
        {
            //const data = req.cache.roles?.find(item => item.name.toLowerCase()==="admin");
            try
            {
                const db = require('../../database/database');
                let response = await db.Users.get();
                let data = []
                for(item of response){
                    const {id, username, create_time, last_login_time, reputation} = item;
                    data.push({id, username, create_time, last_login_time, reputation});
                }
                res.status(200).json(data);
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

    app.get('/users/:id', auth, async (req, res) =>
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
}