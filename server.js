require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 5000;
const salt_rounds = 10;

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.once('open', (err, resp) => console.log("Connected Successfully to MongoDB"));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.json({
        message: "Welcome to the Demo Project"
    });
});

const userRoutes = require("./routes/users");
app.use('/user', userRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));