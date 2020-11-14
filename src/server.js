const express = require("express");
const { userInfo } = require("os");
const path = require("path");
const server = express();

server
  .use(express.static("public"))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "hbs")
  .get("*", (req, res) => {
    res.render("index");
  })
  .listen("5060");
