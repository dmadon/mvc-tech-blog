const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/',withAuth,(req,res) => {
    Post.findAll({
        where:{
            user_id: req.session.user_id,
            
        },
        attributes:['id','title','content','created_at','updated_at'],
        include:[
            {
                model:Comment,
                attributes:['id','comment_text','user_id','post_id','created_at','updated_at'],
                include:{
                    model:User,
                    attributes:['username']
                }
            },
            {
                model:User,
                attributes:['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain:true}));
        const user = req.session.username;
        res.render('dashboard',{posts, user, loggedIn:true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id',withAuth,(req,res) => {
    Post.findOne({
        where:{
            id:req.params.id
        },
        attributes:['id','title','content','created_at','updated_at'],
        include:[
            {
                model:Comment,
                attributes:['id','comment_text','user_id','post_id','created_at','updated_at'],
                include:{
                    model:User,
                    attributes:['username']
                }
            },
            {
                model:User,
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

        res.render('edit-post',{post,loggedIn:req.session.loggedIn})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// CREATE A ROUTE TO THE NEW POST VIEW
router.get('/new-post',(req,res) => {
   
    res.render('new-post',{
        user_id:req.session.user_id,
        loggedIn:req.session.loggedIn,
        username:req.session.username})
});


module.exports = router;