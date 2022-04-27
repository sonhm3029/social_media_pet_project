const express = require("express");
const router = express.Router();
const Users = require("./users");
const Pins = require("./pins");
const Saves = require("./saves");
const Upload = require("./upload");
const Comments = require("./comments");
const GoogleAuthVerify = require("../middleware/authMiddleware");
const Verify = require("./verify");

const prefix = "/api/v1";

router.get("/", (req, res, next)=> {
    res.send("Hello world!");
})


module.exports = function (app) {
    app.use(`/`, router);
    app.use('/verify', Verify);
    app.use(`${prefix}/users`,GoogleAuthVerify, Users);
    app.use(`${prefix}/pins`,GoogleAuthVerify, Pins);
    app.use(`${prefix}/saves`,GoogleAuthVerify, Saves);
    app.use(`${prefix}/upload`,GoogleAuthVerify, Upload);
    app.use(`${prefix}/comments`,GoogleAuthVerify, Comments);
}