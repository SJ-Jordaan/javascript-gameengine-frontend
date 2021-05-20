const express = require("express");
const path = require("path");

const authRouter = express.Router();

authRouter.get("/signin", serveSigninPage);
authRouter.get("/signup", serveSignupPage);


function serveSigninPage(req, res) {
    res.sendFile(path.join(__dirname, "../", "web", "view", "signin.html"));
}

function serveSignupPage(req, res) {
    res.sendFile(path.join(__dirname, "../", "web", "view", "signup.html"));
}

module.exports = authRouter;
