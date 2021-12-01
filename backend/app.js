const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const Post = require('./models/post')

const app = express();


// change this to personal mongo db database locally
mongoose.connect("mongodb://localhost")
.then(() => {
  console.log('Connected to database!')
})
.catch(() => {
  console.log('Connection failed!')
})

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// header means its allowed to access our resources
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

app.post('/api/posts',(req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts',(req,res,next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: "post retrieved successfully",
      posts: documents
    });
  });
});

app.delete("/api/posts/:id",(req,res,next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted"});
  });
});

module.exports = app;
