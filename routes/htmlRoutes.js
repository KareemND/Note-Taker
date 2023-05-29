const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/notes', (req, res) => {
  // Send the 'notes.html' file
  res.sendFile(path.join(__dirname,'..', 'public', 'notes.html'));
});

router.get('*', (req, res) => {
  // Send the 'index.html' file for all other routes
  res.sendFile(path.join(__dirname,'..' ,'public', 'index.html'));
});

module.exports = router;
