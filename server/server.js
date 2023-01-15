const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const path = require('path');

const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const logger = require("morgan")
const dotenv = require("dotenv");
dotenv.config()

const PORT = 3000;
const api = require('./routes/api');
const app = express();

app.use(fileUpload());

mongoose.connect(process.env.dbURI)
    .then(() => {
        console.log('Connected to db');
    })
    .catch((error) => {
        console.log(error);
    })

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'))
app.use(express.json());
app.use('/api', api)
app.get('/', function (req, res) {
    res.send('Hello from server')
})

app.listen(PORT, function () {
    console.log('Server running on localhost : ' + PORT)
})