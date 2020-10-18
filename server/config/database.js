const { Sequelize } = require('sequelize');

// connect to Heroku-hosted postgresql
/*

const heroku_db_url = "postgres://msjjwozxhzqcyo:0fe16b399263f40e6c5412ae728388375f123f4a03163441274741d070c5e6ae@ec2-54-228-250-82.eu-west-1.compute.amazonaws.com:5432/d4t32q409i9ah6";
const sequelize = new Sequelize(heroku_db_url, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: false
    }
});

*/

// connect to local postgresql
const sequelize = new Sequelize('arla-climate-check', 'postgres', 'george', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false
    }
});

sequelize.sync()
.then(
    
)
.catch(err => {

});


module.exports = sequelize;
