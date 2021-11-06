const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require('dotenv').config({path : './../.env'})

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true})
    .then(() => console.log('Mongo connected successful')).catch((err) => console.log(err))

module.exports = router;
