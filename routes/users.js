const router = require('express').Router();
const User = require('../models/user.js');

router.route('/addUser').post(async (req, res)=>{
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
    user.save(err => {
        if (err){
            res.json(err);
        }
        else{
            res.status(200).json({
                message: "User Saved successfully"
            });
        }
    });
});

router.route('/updateUser/:username').post((req, res)=>{
    const username = req.params.username;
    const {
        old_password, 
        new_password
    } = req.body;
    User.findOne({username}, async (err, user)=>{
        if (err){
            res.json(err);
        }
        else{
            if (user){
                if (await bcrypt.compare(old_password, user.password)){
                    User.findByIdAndUpdate(user._id, {
                        password: await bcrypt.hash(new_password, 10)
                    }, err =>{
                        if (err){
                            res.json(err);
                        }
                        else{
                            res.json({
                                message: "Updated successfully."
                            });
                        }
                    });
                }
                else{
                    res.json({
                        message: "Password incorrect."
                    })
                }
            }
            else{
                res.json({
                    message: "User does not exist"
                });
            }
        }
    });
});

router.route("/:username").delete((req, res)=>{
    User.findOne({username: req.params.username}, async (err, user)=>{
        if (err){
            res.json(err);
        }
        else{
            if (user){
                if (await bcrypt.compare(req.body.password, user.password)){
                    User.findByIdAndDelete(user._id, err=>{
                        if (err){
                            res.json(err);
                        }
                        else{
                            res.json({
                                message: "User deleted."
                            });
                        }
                    });
                }
                else{
                    res.json({
                        message: "Password incorrect."
                    })
                }
            }
            else{
                res.json({
                    message: "User does not exist."
                });
            }
        }
    });
});

// router.route("/all").get((req, res)=>{
//     User.find({}, (err, users)=>{
//         res.json(users);
//     });
// });

router.route("/:username").get((req, res)=>{
    User.findOne({username: req.params.username}, (err, user)=>{
        if (!user){
            res.status(404).json({
                message: "User dose not exist."
            });
        }
        else{
            if (err){
                res.json(err);
            }
            else{
                res.json(user);
            }
        }
    });
});


module.exports = router;