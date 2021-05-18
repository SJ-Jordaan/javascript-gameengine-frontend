const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/gameEngine", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "web", "view", "engine.html"));
});

router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "web", "view", "about.html"));
});

module.exports = router;
