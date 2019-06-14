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
  return "Enter `MOVE`, `LEFT`, `RIGHT` or `REPORT`";
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

  return true;
};

const nextQuestion = [
  {
    type: "text",
    name: "movement",
    message: "next movement? if you want to finish, you can enter REPORT",
    validate: value => checkMovement(value.toUpperCase())
  }
];

const isCoordinateOverTheBoard = number => {
  if (number < 0) {
    return 0;
  }
  if (number >= gridSize) {
    return gridSize - 1;
  }
  return false;
};

const changeDirection = (currentDirection, newDirection) => {
  const currentPosition = directions.indexOf(currentDirection);
  if (newDirection === "LEFT") {
    if (currentPosition - 1 < 0) {
      return "WEST";
    }
    return directions[currentPosition - 1];
  }
  if (newDirection === "RIGHT") {
    if (currentPosition + 1 >= directions.length) {
      return "NORTH";
    }
    return directions[currentPosition + 1];
  }
};

const moveHandlers = {
  NORTH: location => ({ x: location.x, y: location.y + 1 }),
  SOUTH: location => ({ x: location.x, y: location.y - 1 }),
  EAST: location => ({ x: location.x + 1, y: location.y }),
  WEST: location => ({ x: location.x - 1, y: location.y })
};

const question = async () => {
  let location = {};

  const { value } = await prompts({
    type: "text",
    name: "value",
    message: "Where do you want to start from? ",
    initial: "PLACE 0,0,North",
    validate: validatePlace
  });

  const input = value.split(" ")[1].split(",");
  location.x = Number(input[0]);
  location.y = Number(input[1]);
  location.direction = input[2].toUpperCase();

  let nextResponse = await prompts(nextQuestion);
  while (nextResponse.movement.toUpperCase() !== "REPORT") {
    if (nextResponse.movement.toUpperCase() === "MOVE") {
      const { x: newX, y: newY } = moveHandlers[location.direction](location);
      location.x = newX;
      location.y = newY;
    }

    const isXOverboard = isCoordinateOverTheBoard(location.x);
    if (typeof isXOverboard === "number") {
      location.x = isXOverboard;
    }
    const isYOverboard = isCoordinateOverTheBoard(location.y);
    if (typeof isYOverboard === "number") {
      location.y = isYOverboard;
    }

    if (
      nextResponse.movement.toUpperCase() === "LEFT" ||
      nextResponse.movement.toUpperCase() === "RIGHT"
    ) {
      location.direction = changeDirection(
        location.direction,
        nextResponse.movement.toUpperCase()
      );
    }
    nextResponse = await prompts(nextQuestion);
  }
  return `${location.x},${location.y},${location.direction}`;
};

const run = async () => {
  const result = await question();
  console.log(result);
};

run();

module.exports = {
  question,
  checkMovement,
  validatePlace,
  isCoordinateOverTheBoard,
  changeDirection
};
