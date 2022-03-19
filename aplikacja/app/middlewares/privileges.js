// get user roles and cache them
module.exports = async (req, res, next) =>{
    if(!req.cache){req.cache = {};}
    if(req.cache.islogged){
        req.cache.roles = [];
        try
        {
            const db = require('../database/database');
            let response = await db.Roles.getByUserID(req.cache.user_id);
            req.cache.roles = response;
        }
        catch(e){
            console.log(e);
           // res.sendStatus(500);
        }
    }
    next();
}