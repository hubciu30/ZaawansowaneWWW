const auth = require('../../middlewares/auth');
module.exports = (app)=>
{
    app.post('/logout', auth, async (req, res) =>
    {
        try{
            const db = require('../../database/database');
            await db.Session.cancel(req.cache.token);
            res.cookie('session','null',{maxAge:0, httpOnly: true});
            res.redirect("/login");
        }
        catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    });
}