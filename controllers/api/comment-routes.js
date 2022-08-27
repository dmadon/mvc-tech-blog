const router = require('express').Router();
const {User,Post,Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// THESE ARE THE /api/comments ROUTES

// GET ALL COMMENTS
router.get('/',(req,res) => {
    Comment.findAll({
        include:[
            {
                model:User,
                attributes:['username']
            },
            {
                model: Post,
                attributes:['id','title','created_at'],
                include:{
                    model: User,
                    attributes:['id','username']
                }
            }
        ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET SINGLE COMMENT
router.get('/:id',(req,res) => {
    Comment.findOne({
        where:{
            id: req.params.id
        },
        include:[
            {
                model:User,
                attributes:['username']
            },
            {
                model:Post,
                attributes:['id','title','created_at'],
                include:{
                    model:User,
                    attributes:['id','username']
                }
            }
        ]
    })
    .then(dbCommentData => {
        if(!dbCommentData){
            res.status(400).json({message:'No comment was found with that id.'});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// CREATE NEW COMMENT
router.post('/',withAuth,(req,res) => {
    // check the session
    if(req.session){
        Comment.create({
            comment_text:req.body.comment_text,
            // use the id from the session
            user_id:req.session.user_id,
            post_id:req.body.post_id
        })
    
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    };
});

// DELETE A COMMENT
router.delete('/:id',withAuth,(req,res) => {
    Comment.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData){
            res.status(400).json({message: 'No comment was found with that id.'});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;