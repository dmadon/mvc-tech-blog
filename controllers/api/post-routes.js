const router = require('express').Router();
const {User,Post,Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// THESE ARE THE /api/posts ROUTES

// GET ALL POSTS
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET A SINGLE POST
router.get('/:id',(req,res) => {
    Post.findOne({
        where:{
            id: req.params.id
        },
        include:[
            {
                model: User,
                attributes:['username']
            },
            {
                model: Comment,
                attributes:['id','comment_text','post_id','user_id','created_at'],
                include:{
                    model:User,
                    attributes:['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message:'No post was found with that id.'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// CREATE NEW POST
router.post('/',withAuth,(req,res) => {
    Post.create({
        title:req.body.title,
        content:req.body.content,
        user_id:req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// UPDATE A POST
router.put('/:id',withAuth,(req,res) => {
    Post.update(req.body,{
        where:{
            id: req.params.id
        },
        individualHooks:true
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(400).json({message: 'No post was found with that id.'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// DELETE A POST
router.delete('/:id',withAuth,(req,res) => {
    Post.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(400).json({message: 'No post was found with that id.'});
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});




module.exports = router;