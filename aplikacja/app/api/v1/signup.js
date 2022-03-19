const crypto = require('crypto');
const {home_path} = require('../../config')
const auth = require('../../middlewares/auth');
module.exports = (app) =>
{
    app.get('/signup', auth, (req, res)=>{
        if(req.cache.islogged){res.redirect('/home');}
        else{
            res.sendFile(home_path+'/views/signup.html');
        }
    });

    app.post('/signup', async (req, res)=>{
        console.log(req.body)
        if(req.body.login && req.body.password && req.body.login.length > 2){
            const db = require('../../database/database');
            const salt = crypto.randomBytes(16).toString('hex');
            const hash = crypto.createHash('sha256').update(req.body.password+salt).digest('hex');
            const time = Date.now();
            try
            {
                let response = await db.Users.getByUsername(req.body.login);
                console.log(response);
                if(response.length === 0){
                    response = await db.query('INSERT INTO `users` (`id`, `username`, `password`, `salt`, `create_time`, `last_login_time`) VALUES (NULL, ?, ?, ?, ?, ?)', [req.body.login, hash, salt, time, 0,])
                    response = await db.query('INSERT INTO `roles` (`id`, `user_id`, `name`, `power`) VALUES (NULL, ?, ?, ?)', [response.insertId, "User", 1]);
                    //res.sendStatus(200);
                    res.status(201).redirect('/login');
                }
                else{
                    res.redirect('/signup?status=2');
                }

                //res.redirect('/login');
            }
            catch(e){
                console.log(e)
                res.sendStatus(500);
            }
        }
        else{
            res.redirect('/signup?status=1');
        }
    });
}