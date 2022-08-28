const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');

// GET ALL POSTS AND RENDER THEM TO THE HOMEPAGE
router.get('/', (req,res) => {
    Post.findAll({
        attributes:['id','title','content','user_id','created_at'],
        order: [['created_at','DESC']],
        include:[
            {
                model:User,
                attributes:['username']
            },
            {
                model:Comment,
                attributes:['id','comment_text','post_id','user_id','created_at'],
                include:{
                    model:User,
                    attributes:['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain:true}));
        res.render('homepage',{
            posts,
            loggedIn: req.session.loggedIn})
    })    
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login',(req,res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
})

// GET THE SINGLE POST THE USER CLICKED ON FROM THE HOMEPAGE AND RENDER THE SINGLE POST'S PAGE
router.get('/posts/:id',(req,res) => {
    Post.findOne({
        where:{
            id: req.params.id
        },
        attributes:['id','title','content','user_id','created_at'],
        include:[
            {
                model: Comment,
                attributes:['id','comment_text','user_id','post_id','created_at'],
                include:{
                    model: User,
                    attributes:['username']
                }
            },
            {
                model: User,
                attributes:['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message:'Post not found.'});
            return;
        }
        const post = dbPostData.get({plain:true});

        res.render('single-post',{
            post,
            loggedIn: req.session.loggedIn})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;