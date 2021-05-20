const express = require("express");
const path = require("path");

const authRouter = express.Router();

authRouter.get("/signin", serveSigninPage);
authRouter.get("/signup", serveSignupPage);
authRouter.post("/signup", signup);

function serveSigninPage(req, res) {
    res.sendFile(path.join(__dirname, "../", "web", "view", "signin.html"));
}

function serveSignupPage(req, res) {
    res.sendFile(path.join(__dirname, "../", "web", "view", "signup.html"));
}

function signup(req, res) {
    setTimeout(() => {
        res.sendStatus(200);
    }, 5000);
}

module.exports = authRouter;
