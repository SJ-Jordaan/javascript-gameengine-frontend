const express = require("express");
const path = require("path");
// const { default: isLoggedIn } = require("../src/middleware/isLoggedIn");
const isLoggedIn = require("../src/middleware/isLoggedIn")
const exploreRouter = express.Router();

exploreRouter.get("/explore", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "web", "view", "explore.html"));
});

module.exports = exploreRouter;
