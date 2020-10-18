const { STRING } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('./../config/database');

const Tag = db.define('tag', {
    name:{
        type: STRING
    }
})

module.exports = Tag;