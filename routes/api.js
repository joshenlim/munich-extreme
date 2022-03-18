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

    /**
     * /api?q=a923df70:%20which%20of%20the%20following%20numbers%20is%20both%20a%20square%20and%20a%20cube:%202209,%20872,%201296,%2093
     */

    if (question.includes("largest")) {
      const numbers = payloads[2].split(",").map((x) => Number(x.trim()));
      const maxNumber = Math.max(...numbers);
      console.log("Do max", maxNumber);
      return res.send(maxNumber.toString());
    } else if (question.includes("square and a cube")) {
      console.log("Square and a cube");
    }
  } else if (question.includes("what")) {
    // what is 2 + 2
    /**
     * /api?q=ec74bce0:%20what%20is%203%20plus%2017
     */

    /**
     * /api?q=ede15740:%20what%20is%205%20multiplied%20by%208
     */
    const [a, b, x, c, y] = question.split(" ");
    if (question.includes("plus")) {
      const sum = Number(x) + Number(y);

      console.log("Sum", sum);
      return res.send(sum.toString());
    } else if (question.includes("multiplied")) {
      const product = Number(x) * Number(y);

      console.log("Product", sum);
      return res.send(product.toString());
    }
  }
});

module.exports = router;
