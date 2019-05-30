var express = require("express");
var router = express.Router();
var data = [];

router.get("/", function(req, res, next) {
  res.send(data);
});

router.put("/", function(req, res, next) {
  found = data.find(i => i.id === req.body.id);
  found.notes = req.body.notes;
  res.send(data);
});

router.post("/", function(req, res, next) {
  const found = data.find(i => i.id === req.body.id);
  if (found) {
    data = [...data.filter(i => i.id !== found.id)];
  } else {
    data = [...data, req.body];
  }
  res.send(data);
});

module.exports = router;
