// import the Sequelize constructor from the library
const Sequelize = require('sequelize');
require('dotenv').config();

// create connection to the database, pass in the MySQL information for username and password
let sequelize;
// when using heroku to host, use a remote datbase:
if(process.env.JAWSDB_URL){
    sequelize = new Sequelize(process.env.JAWSDB_URL);
}
// when we are using our local machine, use the local database:
else{
    sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASSWORD,{
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
};

module.exports = sequelize;