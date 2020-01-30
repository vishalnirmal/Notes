require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.json({
        message: "Welcome to the Demo Project"
    });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
