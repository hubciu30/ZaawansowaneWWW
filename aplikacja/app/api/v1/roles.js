const auth = require('../../middlewares/auth');
const privileges = require('../../middlewares/privileges');
module.exports = (app)=>
{
    app.delete('/api/roles/:id', auth, privileges, async (req, res) =>
    {
        if(req.cache.islogged && req.cache.roles.length>0)
        {
            const data = req.cache.roles?.find(item => item.name.toLowerCase()==="admin");
            if(data)
            {
                try{
                    const db = require('../../database/database');
                    let response = await db.Roles.getByID(req.params.id);
                    if(response.length === 1){
                        await db.Roles.delete.ByID(req.params.id);
                        res.sendStatus(200);
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
            else{
                res.sendStatus(403);
            }
        }
        else
        {
            res.sendStatus(403);
        }
    });
}