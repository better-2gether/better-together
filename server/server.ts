// const express = require('express');
import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, '../build')));

// Handle all other requests with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
