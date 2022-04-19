const express = require("express");
const router = express.Router();
const Users = require("./users");
const prefix = "/api/v1";

router.get("/", (req, res, next)=> {
    res.send("Hello world!");
})


module.exports = function (app) {
    app.use(`${prefix}/`, router);
    app.use(`${prefix}/users`, Users);
}