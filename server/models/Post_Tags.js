const { STRING } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('./../config/database');
const Post = require('./Posts');
const Tag = require('./Tags');

const Post_Tag = db.define('post_tag', {
})

Post_Tag.belongsTo(Post);
Post_Tag.belongsTo(Tag);

module.exports = Post_Tag;