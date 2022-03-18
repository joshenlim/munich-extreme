var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  console.log(req.query);
  res.send({ ping: "pong" });
});

module.exports = router;
