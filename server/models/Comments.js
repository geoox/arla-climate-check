const { STRING, TIME } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('./../config/database');
const Post = require('./Posts');
const User = require('./Users');

const Comment = db.define('comment', {
    created_at:{
        type: TIME
    }
})

Comment.belongsTo(Post);
Comment.belongsTo(User);

module.exports = Comment;