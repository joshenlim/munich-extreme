var express = require("express");
var router = express.Router();

function isPrime(num) {
  for (let i = 2; i * i <= num; i++) if (num % i === 0) return false;
  return num > 1;
}

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

    /**
     * /api?q=2c96f660:%20which%20of%20the%20following%20numbers%20are%20primes:%20931,%20283"
     */

    if (question.includes("largest")) {
      const numbers = payloads[2].split(",").map((x) => Number(x.trim()));
      const maxNumber = Math.max(...numbers);
      console.log("Do max", maxNumber);
      return res.send(maxNumber.toString());
    } else if (question.includes("square and a cube")) {
      console.log("Square and a cube");

      // /api?q=a923df70:%20which%20of%20the%20following%20numbers%20is%20both%20a%20square%20and%20a%20cube:%202209,%20872,%201296,%2093

      const numbers = payloads[2].split(",").map((x) => Number(x.trim()));

      // array of numbers (:string) that are confirmed
      confirmedNumbers = [];

      numbers.map((number) => {
        console.log("mapping...");
        const _number = Number(number);
        cubeRoot = Math.cbrt(_number);
        squareRoot = Math.sqrt(_number);

        checkRoot = cubeRoot % 1 === 0;
        checkSquare = squareRoot % 1 === 0;

        if (checkRoot + checkSquare) {
          confirmedNumbers.push(number);
        }
      });
      return res.send(confirmedNumbers.toString());
    } else if (question.includes("primes")) {
      const numbers = payloads[2].split(",").map((x) => Number(x.trim()));
      const result = numbers.filter((number) => {
        if (isPrime(number)) return number;
      });
      return res.send(result.toString());
    }
  } else if (question.includes("what")) {
    // what is 2 + 2
    /**
     * /api?q=ec74bce0:%20what%20is%203%20plus%2017
     */

    /**
     * /api?q=ede15740:%20what%20is%205%20multiplied%20by%208
     */
    if (question.includes("plus")) {
      const [a, b, x, c, y] = question.split(" ");
      const sum = Number(x) + Number(y);

      console.log("Sum", sum);
      return res.send(sum.toString());
    } else if (question.includes("multiplied")) {
      const [a, b, x, c, d, y] = question.split(" ");
      console.log("Multiply", x, y);
      const product = Number(x) * Number(y);

      console.log("Product", product);
      return res.send(product.toString());
    } else if (question.includes("divided")) {
      const [a, b, x, c, d, y] = question.split(" ");
      console.log("Divide", x, y);
      const divider = Number(x) / Number(y);

      console.log("Divide", divider);
      return res.send(divider.toString());
    }
  } else if (question.includes("what is your name")) {
    // what is your name

    return res.send("JandJ");
  }
  return res.send((0).toString());
});

module.exports = router;
