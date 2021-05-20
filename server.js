// server.js
const express = require("express");
const path = require("path");
const homeRouter = require("./routes/homeRouter");
const engineRouter = require("./routes/engineRouter");
const exploreRouter = require("./routes/exploreRouter");
const welcomeRouter = require("./routes/welcomeRouter");

// Define Express App
const app = express();
app.use(homeRouter);
app.use(engineRouter);
app.use(exploreRouter);
app.use(welcomeRouter);

// Serve Static Assets

app.use("/public", express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("Server connected at:", PORT);
});
