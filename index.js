const prompts = require("prompts");
const { isValidNumber } = require("./number");

const directions = ["NORTH", "EAST", "SOUTH", "WEST"];
const gridSize = 5;

const checkMovement = value => {
  if (
    value === "MOVE" ||
    value === "LEFT" ||
    value === "RIGHT" ||
    value === "REPORT"
  ) {
    return true;
  }
  return "Entre `MOVE`, `LEFT`, `RIGHT` or `REPORT`";
};

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

const nextQuestion = [
  {
    type: "text",
    name: "movement",
    message: "next movement? if you want to finish, you can entre REPORT",
    validate: value => checkMovement(value.toUpperCase())
  }
];

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

  let response2 = await prompts(nextQuestion);

  if (response2.movement.toUpperCase() === "MOVE") {
    if (location.direction === "NORTH") {
      location.y = location.y + 1;
    }
    if (location.direction === "EAST") {
      location.x = location.x + 1;
    }
    if (location.direction === "SOUTH") {
      location.y = location.y - 1;
    }
    if (location.direction === "WEST") {
      location.x = location.x - 1;
    }
  }
  console.log(location);
};

question();
