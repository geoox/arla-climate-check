const express = require('express');
const db = require('../config/database');
const router = express.Router();
const Topics = require('../models/Topics');
const Users = require('../models/Users');
const Comments = require('../models/Comments');
const Posts = require('../models/Posts');
const Tags = require('../models/Tags');
const Topic = require('../models/Topics');
const Op = require('sequelize').Op;

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

router.post('/user', async (req, res, next) => {
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

router.post('/post', async (req, res, next) => {
    try {

        const topic = await Topics.findOne({
            where: {
                name: req.body.topic
            }
        });

        const user = await Users.findOne({
            where: {
                username: req.body.username
            }
        });

        console.log('topic', topic.dataValues);
        console.log('user', user.dataValues);
        
        const newPost = await Posts.create({
            title: req.body.title,
            text: req.body.text,
            created_at: new Date(),
            rating: 0,
            topicId: topic.dataValues.id,
            userId: user.dataValues.id,
            views: 0
        });

        const tags = req.body.tags;

        await tags.forEach(async (tag) => {
            let tag_db = await Tags.findOne({
                where: {
                    name: tag
                }
            });

            newPost.addTag(tag_db.dataValues.id);

        });

        return res.status(200).json({
            status: 'OK',
            newPost: newPost
        })

    } catch (err) {
        return res.status(500).json({
            'error': err
        });
    }
})

router.get('/posts-newest', async (req,res,next) => {
    try{
        
        const posts = await Posts.findAll({
            include: [{
                model: Tags,
                as: "tags"
            },
            {
                model: Topic,
                as: "topic"
            }
            ],
            limit: 3,
            order: [['created_at', 'DESC']],
        });
    
        return res.status(200).json({
            'response': posts
        })
    } catch(err) {
        return res.status(500).json({
            'error': err
        });
    }
})

router.get('/posts-top', async (req,res,next) => {
    try{
        const posts = await Posts.findAll({
            include: [{
                model: Tags,
                as: "tags"
            },
            {
                model: Topic,
                as: "topic"
            }
            ],
            limit: 3,
            order: [['rating', 'DESC']],
        });
    
        return res.status(200).json({
            'response': posts
        })
    } catch(err) {
        return res.status(500).json({
            'error': err
        });
    }
})

router.get('/post/:id', async (req, res, next) => {
    try{
        const post = await Posts.findByPk(req.params.id, {
            include: [{
                model: Tags,
                as: "tags"
            },
            {
                model: Users
            },
            {
                model: Topic,
                as: "topic"
            }
            ]});
        return res.status(200).json({
            "response": post
        });
    } catch(err){
        return res.status(500).json(err);
    } 

})

// fix this
router.get('/filtered_posts', async (req, res, next) => {
    const tags = req.body.tags? {[Op.in]:req.body.tags} : {[Op.ne]: null};
    const topic = req.body.topic? req.body.topic : {[Op.ne]: null};
    let orderFinal;
    if(req.body.order){
        let order='';
        if(req.body.order.by == 'date') order+='"created_at" ';
        if(req.body.order.by == 'rating') order+='"rating" ';
        if(req.body.order.by == 'comments') order+= '"comments" ';

        if(req.body.order.order == 'asc') order+='ASC';
        if(req.body.order.order == 'desc') order+='DESC';
        orderFinal = order;
    } 
    try{
        console.log(orderFinal)
        const posts = await Posts.findAll({
            include: [{
                model: Tags,
                as: "tags"
            },
            {
                model: Topic,
                as: "topic"
            },
            ],
            where: {
                '$tags.name$': tags,
                '$topic.name$':topic
            }
            
        });

        console.log('posts', posts);

        res.status(200).json({
            'response': posts
        })
    } catch(err) {
        return res.status(500).json({
            'error': err
        });
    }
})

module.exports = router;
