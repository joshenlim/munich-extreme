var express = require("express");
var router = express.Router();

function isPrime(num) {
  for (let i = 2; i * i <= num; i++) if (num % i === 0) return false;
  return num > 1;
}

router.get("/", function (req, res, next) {
  const payloads = req.query.q.split(":").map((x) => x.trim().toLowerCase());

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
      return res.send(maxNumber.toString());
    } else if (question.includes("square and a cube")) {
      // /api?q=a923df70:%20which%20of%20the%20following%20numbers%20is%20both%20a%20square%20and%20a%20cube:%202209,%20872,%201296,%2093

      const numbers = payloads[2].split(",").map((x) => Number(x.trim()));

      // array of numbers (:string) that are confirmed
      confirmedNumbers = [];

      numbers.map((number) => {
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
      /**
       * /api?q=ee6f27b0:%20what%20is%202%20plus%204%20plus%2017
       */
      const questionSplit = question.split("plus").map((x) => x.trim());
      const firstNumber = questionSplit[0].split(" ")[2];
      const numbers = [firstNumber]
        .concat(questionSplit.slice(1))
        .map((x) => Number(x));
      const sum = numbers.reduce((partialSum, a) => partialSum + a, 0);

      return res.send(sum.toString());
    } else if (question.includes("minus")) {
      const [a, b, x, c, y] = question.split(" ");
      const sum = Number(x) - Number(y);

      //
      return res.send(sum.toString());
    } else if (question.includes("multiplied")) {
      const [a, b, x, c, d, y] = question.split(" ");
      //
      const product = Number(x) * Number(y);

      //
      return res.send(product.toString());
    } else if (question.includes("divided")) {
      const [a, b, x, c, d, y] = question.split(" ");
      //
      const divider = Number(x) / Number(y);

      //
      return res.send(divider.toString());
    } else if (question.includes("fibonacci")) {
    }
  } else if (question.includes("what is your name")) {
    // what is your name

    return res.send("JandJ");
  } else if (question.includes("who played james bond in")) {
    // what is your name

    const split = question.split("in the film ");

    const actor = split[1];

    if (!actor) return res.send("Roger Moore");

    switch (actor) {
      case "dr no":
        return res.send("Sean Connery");
        break;

      default:
        return res.send("Roger Moore");
        break;
    }
  } else if (question.includes("what is the color of a")) {
    // what is your name

    const split = question.split(" ");
    const object = split[split.length - 1];

    switch (object) {
      case "banana":
        return res.send("banana");
        break;

      default:
        break;
    }
    return res.send("not sure");
  }

  return res.send((0).toString());
});

module.exports = router;
