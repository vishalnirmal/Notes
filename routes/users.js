const router = require('express').Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../middleware/middleware');
const salt_rounds = process.env.salt_rounds;

router.post('/forgot_password', (req, res)=>{
    res.json(status=404, { 
            msg: "hello"
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
        password
    } = req.body;
    const user = User({
        firstName: firstName,
        lastName: lastName,
        username: username,
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
                        res.res.json(err);
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