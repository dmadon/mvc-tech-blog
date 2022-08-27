const router = require('express').Router();
const {User,Post,Comment} = require('../../models');

// THESE ARE THE /api/users ROUTES

// GET ALL USERS
router.get('/',(req, res) => {
    User.findAll({
        attributes:{exclude:['password']},
        include: [
            {
                model: Post
            },
            {
                model: Comment
            }
        ]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// GET SINGLE USER BY ID
router.get('/:id',(req,res) => {
    User.findOne({
        where:{
            id: req.params.id
        },
        attributes:{exclude: ['password']},
        include:[
            {
                model: Post
            },
            {
                model: Comment
            }
        ]
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(400).json({message: 'There was no user found with that id.'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// CREATE A NEW USER
router.post('/',(req,res) => {
    User.create({
        username: req.body.username,
        email:req.body.email,
        password: req.body.password
    })
    .then(dbUserData => { 
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        })       
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// LOGIN AN EXISTING USER
router.post('/login',(req,res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(400).json({message:'No user was found with that email address.'});
            return;
        }
        // verify user with the custom checkPassword method we added to the User model
        const validPassword = dbUserData.checkPassword(req.body.password);

        if(!validPassword){
            res.status(400).json({message: 'Password incorrect.'});
            return;
        }
        // if password is verified, start a session with the user's credentials
        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({user:dbUserData,message:'You are now logged in!'});
        })
    })
})

// LOGOUT A USER
router.post('/logout',(req,res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        })
    }
    else{
        res.status(404).end();
    }
});

// UPDATE USER INFO
router.put('/:id',(req,res) => {
    User.update(req.body,{
        individualHooks: true,
        where:{
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message:'No user was found with that id.'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// DELETE A USER
router.delete('/:id',(req,res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message:'No user was found with that id.'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;