// server.js
const express = require('express');
const path = require("path");
const engineRouter = require("./routes/engineRouter");

// Define Express App
const app = express();
app.use(engineRouter);
// Serve Static Assets
app.use('/public', express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server connected at:', PORT);
});
