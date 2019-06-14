const prompts = require("prompts");
const { isValidNumber } = require("./number");

const directions = ["NORTH", "EAST", "SOUTH", "WEST"];

const validatePlace = value => {
  const inputs = value.split(" ");

  if (inputs.length !== 2) {
    return "You should follow the format `PLACE 0,0,NORTH`";
  }

  if (inputs[0].toUpperCase() !== "PLACE") {
    return "please put `PLACE` at front";
  }

  const coordinates = inputs[1].split(",");
  if (coordinates.length !== 3) {
    return "Make sure you follow `PLACE 0,0,NORTH` format";
  }

  const [x, y, direction] = coordinates;

  const xValidation = isValidNumber(x);
  if (typeof xValidation === "string") {
    return xValidation;
  }

  const yValidation = isValidNumber(y);
  if (typeof isValidNumber(y) === "string") {
    return yValidation;
  }

  if (directions.indexOf(direction.toUpperCase()) < 0) {
    return "The direction is invalid";
  }
};

const question = async () => {
  let location = {};

  const response = await prompts({
    type: "text",
    name: "value",
    message: "Where do you want to start from? ",
    initial: "PLACE 0,0,North",
    validate: value => {
      const result = validatePlace(value);
      if (typeof result !== "string") {
        const input = value.split(" ")[1].split(",");
        location.x = Number(input[0]);
        location.y = Number(input[1]);
        location.direction = input[2].toUpperCase();
        return true;
      }
      return result;
    }
  });

  console.log(response);
};

question();
