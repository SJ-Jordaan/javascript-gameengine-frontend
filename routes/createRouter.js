const express = require("express");
const path = require("path");

const createRouter = express.Router();
createRouter.use(express.json());

createRouter.get("/create/terms-of-use", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "web", "view", "terms.html"));
});

createRouter.get("/create/new-game", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "web", "view", "createNew.html"));
});

createRouter.post("/create/new-game", (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

createRouter.get("/create/workspace/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "web", "view", "workspace.html"));
});

module.exports = createRouter;
