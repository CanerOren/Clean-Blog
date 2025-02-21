import express from 'express';
// const express = require('express');
import ejs from 'ejs'
// const ejs = require('ejs');
import mongoose from 'mongoose';

import path from 'path';
// const path = require('path');

import Post from './models/Post.js';

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/clean-blog-db')
  .then(()=>{console.log('Succesfully connected MongoDB')})
  .catch((err)=>{console.log(`Connection error : ${err}`)});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//ROUTES
app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index',{
    posts
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.get('/post',(req,res)=>{
  res.render('post');
});

app.post('/posts',async(req,res)=>{
  await Post.create(req.body);
  res.redirect('/');
})

const port = 3001;
app.listen(port, () => {
  console.log(`Server initialized at ${port} port`);
});
