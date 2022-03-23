const {home_path} = require('../config')
const auth = require('../middlewares/auth');
module.exports = (app) =>
{
    app.get('/signup', auth, (req, res)=>{
        if(req.cache.islogged){res.redirect('/home');}
        else{
            res.sendFile(home_path+'/views/signup.html');
        }
    });
}