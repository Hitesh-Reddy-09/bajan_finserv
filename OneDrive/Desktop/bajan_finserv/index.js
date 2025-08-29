const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());


const FULL_NAME = "john_doe";
const DOB = "17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// Helper functions
function isNumber(str) {
  return /^[0-9]+$/.test(str);
}
function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}
function isSpecial(str) {
  return !isNumber(str) && !isAlphabet(str);
}
function alternatingCaps(str) {
  let result = "";
  let upper = true;
  for (let ch of str) {
    if (/[a-zA-Z]/.test(ch)) {
      result += upper ? ch.toUpperCase() : ch.toLowerCase();
      upper = !upper;
    }
  }
  return result;
}

function processData(data) {
  const oddNumbers = [];
  const evenNumbers = [];
  const alphabets = [];
  const specialChars = [];
  let sum = 0;
  let alphaConcat = "";

  for (let item of data) {
    if (isNumber(item)) {
      let num = parseInt(item, 10);
      sum += num;
      if (num % 2 === 0) {
        evenNumbers.push(item);
      } else {
        oddNumbers.push(item);
      }
    } else if (isAlphabet(item)) {
      alphabets.push(item.toUpperCase());
      alphaConcat += item;
    } else if (isSpecial(item)) {
      specialChars.push(item);
    }
  }

 
  let concatString = alternatingCaps(alphaConcat.split("").reverse().join(""));

  return {
    is_success: true,
    user_id: `${FULL_NAME}_${DOB}`,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    odd_numbers: oddNumbers,
    even_numbers: evenNumbers,
    alphabets: alphabets,
    special_characters: specialChars,
    sum: sum.toString(),
    concat_string: concatString,
  };
}


app.post("/bfhl", (req, res) => {
  try {
    if (!req.body || !req.body.data) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid request. 'data' field is required",
      });
    }

    const response = processData(req.body.data);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      is_success: false,
      message: "Internal server error",
    });
  }
});


app.get("/", (req, res) => {
  res.send("Full Stack Question Paper API is running...");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
