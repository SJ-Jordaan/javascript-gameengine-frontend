const express = require("express");
const path = require("path");

const welcomeRouter = express.Router();

welcomeRouter.get("/welcome", serveWelcomePage);

function serveWelcomePage(req, res) {
    res.sendFile(path.join(__dirname, "../", "web", "view", "welcome.html"));
}

module.exports = welcomeRouter;
