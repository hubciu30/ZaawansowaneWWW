const {home_path} = require('../config')
//const auth = require('../middlewares/auth');
module.exports = (app) =>
{
    app.get('/login', (req, res)=>{ 
        res.sendFile(home_path+'/views/login.html');
    });
}