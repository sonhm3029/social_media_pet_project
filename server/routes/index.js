const express = require("express");
const router = express.Router();
const Users = require("./users");
const Pins = require("./pins");
const Saves = require("./saves");
const Upload = require("./upload");
const Comments = require("./comments");

const prefix = "/api/v1";

router.get("/", (req, res, next)=> {
    res.send("Hello world!");
})


module.exports = function (app) {
    app.use(`${prefix}/`, router);
    app.use(`${prefix}/users`, Users);
    app.use(`${prefix}/pins`, Pins);
    app.use(`${prefix}/saves`, Saves);
    app.use(`${prefix}/upload`, Upload);
    app.use(`${prefix}/comments`, Comments);
}