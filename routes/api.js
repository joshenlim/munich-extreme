var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const payloads = req.query.q.split(":").map((x) => x.trim().toLowerCase());

  console.log("Query", payloads);

  const [id, question] = payloads;
  if (question.includes("which")) {
    console.log("Do max");
    const numbers = payloads[2].split(",").map((x) => Number(x.trim()));
    const maxNumber = Math.max(...numbers);
    res.send(maxNumber.toString());
  } else if (question.includes("what")) {
    console.log("Do sum");
  }

  res.send({ name: "JandJ" });
});

module.exports = router;

/**
 * /api?q=619383a0:%20which%20of%20the%20following%20numbers%20is%20the%20largest:%20722,%208
 */

/**
 * /api?q=ec74bce0:%20what%20is%203%20plus%2017
 */
