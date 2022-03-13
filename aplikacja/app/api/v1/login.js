const crypto = require('crypto');
const {home_path, session_duration} = require('../../config');
const auth = require('../../middlewares/auth');
module.exports = (app) =>
{
    app.get('/login', auth, (req, res)=>{
        if(req.cache.islogged){res.redirect('/home');}
        else{
            res.sendFile(home_path+'/views/login.html');
        }
    })

    app.post('/login', async (req, res)=>{
        if(req.body.login && req.body.password){
            try{
                const db = require('../../database/database');
                let response = await db.Users.get(null, req.body.login);
                if(response.length > 0){
                    const user = response[0];
                    const hash = crypto.createHash('sha256').update(req.body.password+user.salt).digest('hex');
                    if(user.password === hash){
                        let token = crypto.randomBytes(32).toString('hex');
                        while(true){
                            let res = await db.Session.get(token);
                            if(res.length === 0){break;}
                            else{token = crypto.randomBytes(32).toString('hex');}
                        }
                        const time = Date.now();
                        const expire = time+session_duration;
                        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                        await db.Session.create(user.id, token, time, expire, ip, req.headers['user-agent']);
                        await db.query('UPDATE `users` SET `last_login_time` = ? WHERE `users`.`id` = ? ', [time, user.id]);
                        res.cookie('session', token, {maxAge:session_duration, httpOnly: true});
                        res.sendStatus(200);
                    }else{
                        res.sendStatus(403);
                    }
                } else{
                    res.sendStatus(403);
                }
            }catch(e){
                console.log(e);
                res.sendStatus(500);
            }
        }
        else
        {
            res.sendStatus(400);
        }
    });
}