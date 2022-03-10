require('dotenv').config();
module.exports = {
    port: process.env.PORT,
    db_host: process.DATABASE_HOST,
    db_user: process.DATABASE_USER,
    db_password: process.DATABASE_PASSWORD,
    db_name: process.DATABASE_NAME
}