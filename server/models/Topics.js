const { STRING } = require('sequelize');
const db = require('./../config/database');

const Topic = db.define('topic', {
    name:{
        type: STRING
    }
})

module.exports = Topic;