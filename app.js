import express from 'express';
// const express = require('express');
import ejs from 'ejs'
// const ejs = require('ejs');
import mongoose from 'mongoose';
import methodOverride from 'method-override';

import path from 'path';
// const path = require('path');

import Post from './models/Post.js';
import { getAllPosts,getPost,createPost,updatePost,deletePost } from './controllers/postControllers.js';
import { getAboutPage, getAddPage,getEditPage } from './controllers/pageControllers.js';

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
app.use(methodOverride('_method',{
  methods:['POST','GET']
}));

//ROUTES
app.get('/', getAllPosts);

app.get('/posts/:id', getPost);

app.get('/about',getAboutPage );

app.get('/add_post', getAddPage);



app.get('/posts/edit/:id', getEditPage);

app.post('/posts',createPost);

app.put('/posts/:id', updatePost);

app.delete('/posts/:id',deletePost);

const port = 3001;
app.listen(port, () => {
  console.log(`Server initialized at ${port} port`);
});
