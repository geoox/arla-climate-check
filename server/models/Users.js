const { STRING } = require('sequelize');
const db = require('./../config/database');

const User = db.define('user', {
    username:{
        type: STRING
    }, 
    password:{
        type: STRING
    },
    name:{
        type: STRING
    }
})

module.exports = User;