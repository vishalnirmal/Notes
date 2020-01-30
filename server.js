require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./user");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.once('open', (err, resp) => console.log("Connected Successfully to MongoDB"));


app.get('/', (req, res)=>{
    res.json({
        message: "Welcome to the Demo Project"
    });
});

app.post('/user/addUser', (req, res)=>{
    const user = User(req.body);
    user.save(err => {
        if (err){
            res.send(err);
        }
        else{
            res.status(200).json({
                message: "User Saved successfully"
            });
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
                res.send(err);
            }
            else{
                res.json(user);
            }
        }
    });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
