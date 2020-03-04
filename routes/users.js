const router = require('express').Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../middleware/middleware');
const salt_rounds = process.env.salt_rounds;
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.email_pass
    }
  });

router.post('/forgot_password', (req, res)=>{
    const {
        username, 
        email
    } = req.body;
    User.findOne({
        username: username,
        email: email
    }, (err, user)=>{
        if (!err){
            if (!user){
                res.json({
                    message: "No user exist with the following details."
                });
            }
            else{
                const token = jwt.sign({id: user._id}, process.env.jwt_secret);
                const link = process.env.link+'/reset_password/'+token;
                transporter.sendMail({
                    from: "handynotes.service@gmail.com",
                    to: user.email,
                    subject: "Password Reset",
                    html: "<h1>Change Password</h1><br><br><h3>To reset your password, <a href="+link+">Click here</a>.</h3>"
                });
                res.sendStatus(200);
            }
        }
        else{
            res.json(err);
        }
    });
});

router.post('/reset_password', auth, (req, res)=>{
    User.findById(req.user.id, async (err, user)=>{
        if (!err){
            const npassword = req.body.password;
            const hpass = await bcrypt.hash(npassword, 10);
            user.password = hpass;
            user.save();
            res.sendStatus(200);
        }
        else{
            res.json({
                message: err
            });
        }
    });
});

router.get('/', auth, (req, res)=>{
    User.findById(req.user.id, (err, user)=>{
        res.json(user);
    });
});

router.route('/register').post(async (req, res)=>{
    const {
        firstName,
        lastName,
        username,
        password,
        email
    } = req.body;

    const user = User({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10)
    });
    User.findOne({username}, (err, usr)=>{
        if (err){
            res.json({err});
        }
        else{
            if (usr){
                res.json({
                    message: "User already exist."
                });
            }
            else{
                user.save(err => {
                    if (err){
                        res.json(err);
                    }
                    else{
                        const token = jwt.sign({
                            id: user.id,
                        }, process.env.jwt_secret);
                        res.json({
                            message: "User Saved successfully",
                            token
                        });
                    }
                });
            }
        }
    });
});

router.post('/login', (req, res)=>{
    const {
        username,
        password
    } = req.body;
    User.findOne({username}, async (err, user)=>{
        if (err){
            res.json(err);
        }
        else{
            if (!user){
                res.json({message: "Invalid credentials."});
            }
            else{
                if (await bcrypt.compare(password, user.password)){
                    const token = jwt.sign({
                        id: user._id
                    }, process.env.jwt_secret);
                    res.json({
                        token,
                        message: "Logged in"
                    });
                }
                else{
                    res.json({message: "Invalid credentials."});
                }
            }
        }
    });
});

module.exports = router;