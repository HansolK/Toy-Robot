const gridSize = 5;

const isValidNumber = input => {
  const number = Number(input);
  if (input === "") {
    return "Not a number";
  }
  if (Number.isNaN(number)) {
    return "Not a number";
  }
  if (number < 0) {
    return "Number should be zero or more";
  }
  if (number % 1 !== 0) {
    return "Number is not a whole number";
  }
  if (number >= gridSize) {
    return `Number should be less than ${gridSize}`;
  }
  return true;
};

module.exports = { isValidNumber };
