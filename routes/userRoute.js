const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {    
    try{
        const userExists = await User.findOne({email: req.body.email});
        if(userExists){
            res.send({
                success: false,
                message: "The user already exists!"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPwd = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashPwd;
        
        const newUser = await User(req.body);
        await newUser.save();
        // console.log(newUser);
        res.send({
            success: true,
            message: "You've successfully signed up, please login now!"
        });
    }catch(err){
        console.log(err)
    }
        
});



router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.send({
                success: false,
                message: "This user doesn't exist!"
            })
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword){
            return res.send({
                success: false,
                message: "Sorry, invalid password entered!"
            })
        }
        const token = jwt.sign({userId: user._id}, process.env.secret_key_jwt, {expiresIn: '1d'});
        res.send({
            success: true,
            message: "You've successfully logged in!",
            token: token
        })
    }catch(err){
        console.log(err);
    }

});

router.get('/get-current-user', authMiddleware, async (req, res) => {
    const user = await User.findById(req.body.userId).select("-password");
   res.send({
    success: true,
    message: 'You are authorized to go to the protected route!',
    data: user
   })
});

module.exports = router;
