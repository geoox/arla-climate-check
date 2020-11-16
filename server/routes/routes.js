const express = require('express');
const db = require('../config/database');
const router = express.Router();
const Topics = require('../models/Topics');
const Users = require('../models/Users');
const Comments = require('../models/Comments');
const Posts = require('../models/Posts');
const Tags = require('../models/Tags');
const Topic = require('../models/Topics');
const Post = require('../models/Posts');
const Comment = require('../models/Comments');
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

router.get('/user/:id', async (req, res, next) => {
    try{
        const user = await Users.findByPk(req.params.id)
        return res.status(200).json({
            'response': user
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
        const post = await Posts.findByPk(req.params.id, { include: [{ all: true, nested: true }]});
        return res.status(200).json({
            "response": post
        });
    } catch(err){
        return res.status(500).json(err);
    } 
})

router.get('/posts',  async (req, res, next) => {
    try{
        const posts = await Posts.findAll({
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
            ],
            order: [['created_at','DESC']]});
        return res.status(200).json({
            "response": posts
        });
    } catch(err){
        return res.status(500).json(err);
    } 
})

router.get('/filtered_posts', async (req, res, next) => {
    console.log('query tag', req.query.tag);

    const tags = req.query.tag? {[Op.in]:req.query.tag} : {[Op.ne]: null};
    const topic = req.query.topic? req.query.topic : {[Op.ne]: null};
    const sort = req.query.sort? [[req.query.sort.split(" ")[0], req.query.sort.split(" ")[1]]] : [['created_at', 'DESC']];
    const title = req.query.title.length>0 ? req.query.title:'';
    console.log('sort', sort);
    try{
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
                '$topic.name$':topic,
                'title': {
                    [Op.iLike]: `%${title}%`
                }
            },
            order: sort
            
        });

        res.status(200).json({
            'response': posts
        })
    } catch(err) {
        return res.status(500).json({
            'error': err
        });
    }
})

router.put('/post/:id/rating', async (req, res, next) => {
    try{
        const updatedPost = await Posts.update(
            {rating: req.body.rating},
            {where: {id: req.params.id}}
        );

        console.log('updatedPost', updatedPost)

        return res.status(200).json({
            response: updatedPost
        });
    } catch(err) {
        return res.status(500).json({
            'error': err
        });
    }
})

// router.get('/comments/:id', async (req, res, next) => {
//     try{
//         const comments = await Comments.findAll
//     }
// })

router.post('/comment/', async (req, res, next) => {
    try{
        const newComment = await Comments.create({
            created_at: new Date(),
            postId: req.body.postId,
            userId: req.body.userId,
            text: req.body.text,
            username: req.body.username
        });

        res.status(200).json({
            "response": newComment
        })
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
