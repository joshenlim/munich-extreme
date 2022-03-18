var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const payloads = req.query.q.split(":").map((x) => x.trim().toLowerCase());

  console.log("Query", payloads);

  const [id, question] = payloads;
  if (question.includes("which")) {
    const numbers = payloads[2].split(",").map((x) => Number(x.trim()));
    const maxNumber = Math.max(...numbers);
    console.log("Do max", maxNumber);
    res.send(maxNumber.toString());
  } else if (question.includes("what")) {
    const [a, b, x, c, y] = question.split(" ");
    const sum = Number(x) + Number(y);
    console.log("Sum", sum);
    res.send(sum);
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
