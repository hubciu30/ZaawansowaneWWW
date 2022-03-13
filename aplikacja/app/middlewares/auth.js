// Check if the user is logged in
module.exports = async (req, res, next) =>
{
    if(!req.cache){req.cache = {};}
    const headers = req.headers;
    const cookies = headers.cookie?.split(';');
    let flag = false; // user is logged
    if(cookies){
        for(let item of cookies){
            if(item.indexOf("session")>-1){
                try{
                    const db = require('../database/database');
                    const token = item.split('=')[1];
                    const res = await db.Session.get(token);
                    if(res.length > 0){
                        const session = res[0];
                        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                        if(session.active===1){
                            if(ip !== session.ip){await db.Session.cancel(token);}
                            else{
                                flag=true;
                                req.cache.token = token;
                            }
                        }
                    }
                }
                catch(e){
                    console.log(e);
                    res.sendStatus(500);
                }
            }
        }
    }

    req.cache.islogged = flag;
    next();
}