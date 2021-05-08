const router = require('express').Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../middleware/middleware');
const salt_rounds = process.env.salt_rounds;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
                const msg = {
                    to: user.email, // Change to your recipient
                    from: process.env.email, // Change to your verified sender
                    subject: 'Password Reset',
                    text: 'Change your HandyNotes account password.',
                    html: '<h1>Change Password</h1><br><br><h3>To reset your password, <a href='+link+'>Click here</a>.</h3>',
                  }
                  sgMail
                    .send(msg)
                    .then(() => {
                        res.sendStatus(200);
                    })
                    .catch((error) => {
                      console.error(error)
                    });
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

router.post('/verify', async (req, res)=>{
    const {
        firstName,
        lastName,
        username,
        password,
        email
    } = req.body;
    const user = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10)
    };
    User.findOne({username}, (err, usr)=>{
        if (err){
            res.json({err});
        }
        else{
            if (usr){
                res.json({
                    message: "Username already taken."
                });
            }
            else{
                User.findOne({email}, (err, usr1)=>{
                    if (err){
                        res.json({err});
                    }
                    else{
                        if (usr1){
                            res.json({
                                message: "Email Address taken"
                            });
                        }
                        else{
                            const token = jwt.sign(user, process.env.jwt_secret);
                            const link = process.env.link + '/verify/' + token;
                            const msg = {
                                to: user.email, // Change to your recipient
                                from: process.env.email, // Change to your verified sender
                                subject: 'Verification of Notes Account.',
                                text: 'Verify your HandyNotes Account',
                                html: '<h1>Verify Your Account</h1><br><br><h3>To verify your account, <a href='+link+'>Click here</a>.</h3>'
                              }
                              sgMail
                                .send(msg)
                                .then(() => {
                                    res.sendStatus(200); 
                                })
                                .catch((error) => {
                                  console.error(error)
                                });
                        }
                    }
                });
            }
        }
    });
});


router.route('/register').post(async (req, res)=>{
    const {
        token, 
        password
    } = req.body;

    jwt.verify(token, process.env.jwt_secret, async (err, data)=>{
        if (await bcrypt.compare(password, data.password)){
            const user = new User(data);
            user.save(err => {
                if (err){
                    res.json(err);
                }
                else{
                    res.sendStatus(200);
                }
            });
        }
        else{
            res.json({
                message: "Password did not match"
            });
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