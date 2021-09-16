const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const {use} = require("express/lib/router");
const stream = require("stream");
require('dotenv').config()

mongoose.connect('mongodb+srv://user:vkspampassword@cluster0.zcbgb.mongodb.net/vk_spam?retryWrites=true&w=majority', {
  useNewUrlParser: true
}).then(() => console.log('Mogno connected successful')).catch((err) => console.log(err))


const HelloSchema = new mongoose.Schema({
  string: {
    type: String
  }
})

const Hello = mongoose.model('hello', HelloSchema)

router.get('/addHelloString', (req, res) => {
  hello = new Hello({
     string: 'Hello World'
    }
  )
  hello.save().then(() => res.send('saved'))
})

router.get('/', (req, res) => {
  Hello.find().then((string, err) => {
       res.render('index', { title: string[0].string });
  })
});

module.exports = router;
