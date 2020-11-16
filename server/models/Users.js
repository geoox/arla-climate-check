const { STRING } = require('sequelize');
const db = require('./../config/database');
const Comment = require('./Comments');

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

User.hasMany(Comment);

module.exports = User;