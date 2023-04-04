// import express from 'express';
// import path from 'path';
// import mongoose from 'mongoose';

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

// establish connection to database
const URI =
  'mongodb+srv://admin:9mBW4segcfFQNNOE@cluster0.iwftg38.mongodb.net/?retryWrites=true&w=majority';

async function connect() {
  try {
    await mongoose.connect(URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to the database: ', error);
  }
}

connect();

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, '../build')));

//test route
app.get('/api/data', (req, res) => {
  const data = { message: 'Hello from the backend!' };
  res.status(200).json(data);
});

// Handle all other requests with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
