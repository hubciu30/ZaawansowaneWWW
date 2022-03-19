module.exports = (pool) =>{
    const Categories = {};

    // get all categories
    Categories.get = ()=>{
        let sql_string = "SELECT * FROM `categories`";
        let arguments = []
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    // get category by id
    Categories.getByID = (categoryID)=>{
        let sql_string = "SELECT * FROM `categories` WHERE `id`=?";
        let arguments = [categoryID]
        return new Promise((resolve, reject) => {
            pool.query(sql_string, arguments, (error, data) =>{
                if(error){reject(error);}
                return resolve(data);
            })
        });
    }

    return Categories;
}