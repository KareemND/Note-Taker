const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '..','db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes.' });
    }

    try {
      const notes = JSON.parse(data);
      res.json(notes);
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).json({ error: 'Failed to parse notes.' });
    }
  });
});

router.post('/notes', (req, res) => {
  const newNote = req.body;

  fs.readFile(path.join(__dirname, '..','db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save note.' });
    }

    try {
      const notes = JSON.parse(data);
      newNote.id = generateUniqueId();
      notes.push(newNote);

      fs.writeFile(path.join(__dirname, '..','db', 'db.json'), JSON.stringify(notes), (writeError) => {
        if (writeError) {
          console.error(writeError);
          return res.status(500).json({ error: 'Failed to save note.' });
        }

        res.json(newNote);
      });
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).json({ error: 'Failed to parse notes.' });
    }
  });
});

// Function to generate a unique ID
const generateUniqueId = () => {
    return Date.now().toString();
  };

module.exports = router;
