var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  console.log("Query", req.query.q);
  res.send({ name: "JandJ" });
});

module.exports = router;
