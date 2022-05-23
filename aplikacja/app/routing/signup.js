const {home_path} = require('../config')
//const auth = require('../middlewares/auth');
module.exports = (app) =>
{
    app.get('/signup',(req, res)=>{
        res.sendFile(home_path+'/views/signup.html');
    });
}