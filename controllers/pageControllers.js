import express from 'express';
// const express = require('express');
import ejs from 'ejs'
// const ejs = require('ejs');
import mongoose from 'mongoose';
import methodOverride from 'method-override';

import path from 'path';
// const path = require('path');

import Post from '../models/Post.js';

const getAboutPage = (req, res) => {
    res.render('about');
  };

const getAddPage =(req, res) => {
    res.render('add_post');
  };

const getEditPage =async (req,res)=>{
    const post = await Post.findOne({_id: req.params.id});
    res.render('edit',{
      post
    });
  }

export {getAboutPage,getAddPage,getEditPage};