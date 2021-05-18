const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/gameEngine", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "web", "views", "engine.html"));
});

router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "web", "views", "about.html"));
});

module.exports = router;
