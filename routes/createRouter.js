const express = require("express");
const path = require("path");

const createRouter = express.Router();

createRouter.get("/create/terms-of-use", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "web", "view", "terms.html"));
});

createRouter.get("/create/new-game", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "web", "view", "createNew.html"));
});

createRouter.get("/create/workspace", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "web", "view", "workspace.html"));
});

module.exports = createRouter;
