const { STRING, TIME, INTEGER, REAL } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('./../config/database');
const Topic = require('./Topics');
const User = require('./Users');

const Post = db.define('post', {
    title:{
        type: STRING
    },
    text:{
        type: STRING
    },
    created_at:{
        type: TIME
    },
    rating:{
        type: REAL
    },
    views:{
        type: INTEGER
    }
})

Post.belongsTo(Topic);
Post.belongsTo(User);

module.exports = Post;