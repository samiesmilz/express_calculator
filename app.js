const express = require("express");
const ExpressError = require("./expressError");

//  App set app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Functions for calculatin mean, mode, median

function mean(numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

function median(numbers) {
  const sortedNumbers = numbers.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedNumbers.length / 2);

  if (sortedNumbers.length % 2 === 0) {
    return (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
  } else {
    return sortedNumbers[middleIndex];
  }
}

function mode(numbers) {
  const frequencyMap = {};
  let maxFrequency = 0;
  let modes = [];

  for (let num of numbers) {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    if (frequencyMap[num] > maxFrequency) {
      maxFrequency = frequencyMap[num];
      modes = [num];
    } else if (frequencyMap[num] === maxFrequency) {
      modes.push(num);
    }
  }

  return modes;
}

function parseNumbersFromString(str) {
  if (!str) {
    throw new ExpressError("Query string is empty", 400);
  }
  const numbers = str.split(",").map((numStr) => {
    const num = parseFloat(numStr.trim()); // Use parseFloat to handle decimal numbers
    if (isNaN(num)) {
      throw new ExpressError(`Invalid number: ${numStr}`, 400);
    }
    return num;
  });
  return numbers;
}

function getResult(req, func) {
  const numsString = req.query["nums"];
  try {
    const nums = parseNumbersFromString(numsString);
    return {
      response: {
        operation: func.name, // Use func.name to get the function name
        value: func(nums),
      },
    };
  } catch (error) {
    // Return error response
    return {
      error: {
        message: error.message,
        statusCode: error.status || 500, // Use provided statusCode or default to 500
      },
    };
  }
}

function getAll(req, mean, mode, median) {
  const numsString = req.query["nums"];
  const nums = parseNumbersFromString(numsString);
  return {
    response: {
      operation: "all",
      count: nums.length,
      mean: mean(nums),
      median: median(nums),
      mode: mode(nums),
    },
  };
}

// Calculate and return the mean
app.get("/mean", (req, res, next) => {
  try {
    const result = getResult(req, mean);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
});

// Calculate and return the median
app.get("/median", (req, res, next) => {
  try {
    const result = getResult(req, median);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

// Calculate and return the mode
app.get("/mode", (req, res, next) => {
  try {
    const result = getResult(req, mode);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

// Handle the '/all' endpoint
app.get("/all", (req, res, next) => {
  try {
    const result = getAll(req, mean, mode, median);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError);
});

// Middleware to handle errors globally
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;
  // set the status and alert the user
  return res.status(status).json({
    error: {
      message,
      status,
    },
  });
});

// This is the port where the app is listening for requests
app.listen(3000, function () {
  console.log("App started on port: http://localhost:3000");
});
