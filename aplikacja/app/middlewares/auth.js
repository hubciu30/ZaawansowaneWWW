// Check if the user is logged in
module.exports = async (req, res, next) =>
{
    if(!req.cache){req.cache = {};}
    const headers = req.headers;
    const cookies = headers.cookie?.split(';');
    req.cache.islogged = false;
    if(cookies){
        for(let item of cookies){
            if(item.indexOf("session")>-1){
                try{
                    const db = require('../database/database');
                    const token = item.split('=')[1];
                    const response = await db.Sessions.getByToken(token);
                    if(response.length > 0){
                        const session = response[0];
                        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                        if(session.active===1){
                            if(ip !== session.ip || Date.now() > parseInt(session.expire_time)){
                                await db.Sessions.cancel(token);
                                res.cookie('session','null',{maxAge:0, httpOnly: true});
                            }
                            else{
                                req.cache.islogged = true;
                                req.cache.token = token;
                                req.cache.user_id = session.user_id;
                            }
                            
                        }
                    }
                }catch(e){
                    console.log(e);
                    res.sendStatus(500);
                }
            }
        }
    }
    next();
}