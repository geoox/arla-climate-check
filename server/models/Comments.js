const { STRING, TIME } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('./../config/database');

const Comment = db.define('comment', {
    created_at:{
        type: TIME
    },
    text:{
        type: STRING
    },
    username:{
        type: STRING
    }
})


module.exports = Comment;