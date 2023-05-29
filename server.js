const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// Routes setup

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Start the server

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
