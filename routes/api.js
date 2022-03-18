var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const payloads = req.query.q.split(":").map((x) => x.trim().toLowerCase());

  console.log("Query", payloads);

  const [id, question] = payloads;
  if (question.includes("which")) {
    // which of the following numbers is largest: 1, 2
    /**
     * /api?q=619383a0:%20which%20of%20the%20following%20numbers%20is%20the%20largest:%20722,%208
     */

    const numbers = payloads[2].split(",").map((x) => Number(x.trim()));
    const maxNumber = Math.max(...numbers);
    console.log("Do max", maxNumber);

    return res.send(maxNumber.toString());
  } else if (question.includes("what")) {
    // what is 2 + 2
    /**
     * /api?q=ec74bce0:%20what%20is%203%20plus%2017
     */

    const [a, b, x, c, y] = question.split(" ");
    const sum = Number(x) + Number(y);

    console.log("Sum", sum);
    return res.send(sum.toString());
  }
});

module.exports = router;
