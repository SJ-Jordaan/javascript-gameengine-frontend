const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/gameEngine", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "public", "views", "engine.html"));
});

router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "public", "views", "about.html"));
});

router.get("/welcome", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "public", "views", "welcome", "index.html"));
});

module.exports = router;
