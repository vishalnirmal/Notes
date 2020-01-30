require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./user");

const app = express();
const PORT = process.env.PORT || 5000;
const salt_rounds = 10;

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.once('open', (err, resp) => console.log("Connected Successfully to MongoDB"));


app.get('/', (req, res)=>{
    res.json({
        message: "Welcome to the Demo Project"
    });
});

app.post('/users/addUser', async (req, res)=>{
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

app.post('/user/updateUser/:username', (req, res)=>{
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

app.delete("/user/:username", (req, res)=>{
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

app.get("/user/:username", (req, res)=>{
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

app.get("/users", (req, res)=>{
    User.find({}, (err, users)=>{
        res.json(users);
    });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
