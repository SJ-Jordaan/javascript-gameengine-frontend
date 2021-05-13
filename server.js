// server.js
const express = require('express');

// Define Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Serve Static Assets
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log('Server connected at:', PORT);
});
