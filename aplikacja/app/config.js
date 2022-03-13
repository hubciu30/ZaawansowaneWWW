require('dotenv').config();
module.exports = {
    home_path: __dirname,
    session_duration: 1000*60*60, // 1h
    port: process.env.PORT,
    db_host: process.env.DATABASE_HOST,
    db_user: process.env.DATABASE_USER,
    db_password: process.env.DATABASE_PASSWORD,
    db_name: process.env.DATABASE_NAME
}