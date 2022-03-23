const auth = require('../../middlewares/auth');
module.exports = (app)=>
{
    app.post('/api/logout', auth, async (req, res) =>
    {
        if(req.cache.islogged){
            try{
                const db = require('../../database/database');
                await db.Sessions.cancel(req.cache.token);
                res.cookie('session','null',{maxAge:0, httpOnly: true});
                res.sendStatus(200);
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