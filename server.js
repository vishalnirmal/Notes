require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middleware/middleware");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
mongoose.connection.once('open', (err, resp) => console.log("Connected Successfully to MongoDB"));

app.use(express.static('build'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const userRoutes = require("./routes/users");
app.use('/user', userRoutes);

const noteRoutes = require("./routes/notes");
app.use('/note', noteRoutes);

app.get('*', (req, res)=>{
    res.sendFile(__dirname+'/build/index.html');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));