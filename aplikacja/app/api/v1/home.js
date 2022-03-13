const auth = require('../../middlewares/auth');
module.exports = (app) =>
{
    app.get('/home', auth, (req, res)=>{
        if(!req.cache.islogged){res.redirect('/login');}
        else{
            res.send("Home");
        }
    });
}