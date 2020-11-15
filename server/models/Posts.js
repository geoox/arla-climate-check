const { STRING, TIME, INTEGER, REAL } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('./../config/database');
const Topic = require('./Topics');
const User = require('./Users');
const Tag = require('./Tags');

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
    }
})

Post.belongsTo(Topic);
Post.belongsTo(User);

Post.belongsToMany(Tag, {
    through: "post_tag",
    as: "tags",
    foreignKey: "post_id",
});
Tag.belongsToMany(Post, {
    through: "post_tag",
    as: "posts",
    foreignKey: "tag_id",
});

module.exports = Post;