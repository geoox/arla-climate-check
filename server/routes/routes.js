const express = require('express');
const db = require('../config/database');
const router = express.Router();
const Topics = require('../models/Topics');
const Users = require('../models/Users');
const Comments = require('../models/Comments');
const Posts = require('../models/Posts');
const Tags = require('../models/Tags');

router.get('/test_db', async (req, res, next) => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        res.status(200).json({
            text: "Connection has been established successfully."
        });
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(500).json(error);
      }
})

router.get('/topics', async (req, res, next) => {
    try{
        const topics = await Topics.findAll({
            attributes: ['id', 'name']
        });
        return res.status(200).json({
            'response': topics
        });
    } catch (err) {
        return res.status(500).json({
            'error': err
        });
    } 
})

router.get('/users', async (req, res, next) => {
    try{
        const users = await Users.findAll({
            attributes: ['id', 'username', 'name']
        });
        return res.status(200).json({
            'response': users
        });
    } catch (err) {
        return res.status(500).json({
            'error': err
        });
    } 
})

router.post('/users', async (req, res, next) => {
    try{
        const newUser = await Users.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name
        });
        return res.status(200).json({
            'response': newUser
        });
    } catch (err) {
        return res.status(500).json({
            'error': err
        });
    } 
})

router.get('/tags', async (req, res, next) => {
    try {
        const tags = await Tags.findAll({
            attributes: ['id', 'name']
        });
        return res.status(200).json({
            'response': tags
        })
    } catch (err) {
        return res.status(500).json({
            'error': err
        });
    }
})

router.post('/tags', async (req, res, next) => {
    try {
        const newTag = await Tags.create({
            name: req.body.name
        });
        return res.status(200).json({
            'response': newTag
        })
    } catch (err) {
        return res.status(500).json({
            'error': err
        });
    }
})

module.exports = router;
