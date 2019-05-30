var express = require("express");
var router = express.Router();
var data = require("../data/shops");

router.get("/", function(req, res, next) {
  res.send(data);
});

module.exports = router;
