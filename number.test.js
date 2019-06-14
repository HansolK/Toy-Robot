const { isValidNumber } = require("./number");
const gridSize = 5;

test("returns not a number when input is empty", () => {
  expect(isValidNumber("")).toEqual("Not a number");
});

test("returns not a number when input is string", () => {
  expect(isValidNumber("something")).toEqual("Not a number");
});

test("returns Number should be zero or more when input is smaller than zero", () => {
  expect(isValidNumber("-1")).toEqual("Number should be zero or more");
});

test("returns Number is not a whole number when input is not a whole number", () => {
  expect(isValidNumber("2.6")).toEqual("Number is not a whole number");
});

test(`returns Number should be less ${gridSize} than when input is bigger than grid size`, () => {
  expect(isValidNumber("12")).toEqual(`Number should be less than ${gridSize}`);
});

test(`returns true`, () => {
  expect(isValidNumber("4")).toBe(true);
});
