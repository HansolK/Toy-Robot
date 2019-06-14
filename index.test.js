const prompts = require("prompts");
const {
  question,
  checkMovement,
  validatePlace,
  isCoordinateOverTheBoard,
  changeDirection
} = require("./index");

jest.mock("prompts");

const gridSize = 5;

describe("checkmovemet", () => {
  const validCase = ["LEFT", "RIGHT", "MOVE", "REPORT"];
  const invalidCase = ["", "asfsdf", "23"];
  validCase.forEach(movement => {
    it(`returns true when input is ${movement}`, () => {
      expect(checkMovement(movement)).toBe(true);
    });
  });
  invalidCase.forEach(movement => {
    it(`returns true when input is ${movement}`, () => {
      expect(checkMovement(movement)).toEqual(
        "Enter `MOVE`, `LEFT`, `RIGHT` or `REPORT`"
      );
    });
  });
});

describe("validatePlace", () => {
  it("returns error message when input is not enough length", () => {
    expect(validatePlace("sfafsd")).toEqual(
      "You should follow the format `PLACE 0,0,NORTH`"
    );
  });

  it('returns error message when the command is not "place"', () => {
    expect(validatePlace("something 0,0,NORTH")).toEqual(
      "please put `PLACE` at front"
    );
  });

  it("returns error message when the coordinates are not included three information", () => {
    expect(validatePlace("PLACE 0,0")).toEqual(
      "Make sure you follow `PLACE 0,0,NORTH` format"
    );
  });

  it("returns error message when the coordinates dont have enough commas", () => {
    expect(validatePlace("PLACE 0,0NORTH")).toEqual(
      "Make sure you follow `PLACE 0,0,NORTH` format"
    );
  });

  it('returns error message when the direction is not "NORTH","SOUTH", "EAST" or "WEST"', () => {
    expect(validatePlace("PLACE 0,0,sdfasdf")).toEqual(
      "The direction is invalid"
    );
  });

  it("returns true when input is in correct form and has correct data", () => {
    expect(validatePlace("PLACE 1,1,NORTH")).toBe(true);
  });
});

describe("isCoordinateOverTheBoard", () => {
  it("returns zero when input is less than zero", () => {
    expect(isCoordinateOverTheBoard(-1)).toEqual(0);
  });

  it(`returns ${gridSize -
    1} when each coordinate is bigger than or equal to gridSize: ${gridSize}`, () => {
    expect(isCoordinateOverTheBoard(5)).toEqual(4);
  });

  it("returns false when each coordinate is within the board", () => {
    expect(isCoordinateOverTheBoard(3)).toEqual(false);
  });
});

describe("changeDirection", () => {
  it("returns WEST when turning left from NORTH", () => {
    expect(changeDirection("NORTH", "LEFT")).toEqual("WEST");
  });

  it("returns NORTH when turning right from WEST", () => {
    expect(changeDirection("WEST", "RIGHT")).toEqual("NORTH");
  });

  it("returns SOUTH when turning right from EAST", () => {
    expect(changeDirection("EAST", "RIGHT")).toEqual("SOUTH");
  });
});

describe("right output", () => {
  beforeEach(() => {
    prompts.mockReset();
  });

  it("moves to the right coordinates", async () => {
    prompts
      .mockReturnValueOnce({ value: "PLACE 0,0,NORTH" })
      .mockReturnValueOnce({ movement: "MOVE" })
      .mockReturnValueOnce({ movement: "REPORT" });
    const result = await question();

    expect(result).toEqual("0,1,NORTH");
  });

  it("moves to the right coordinates", async () => {
    prompts
      .mockReturnValueOnce({ value: "PLACE 1,2,EAST" })
      .mockReturnValueOnce({ movement: "MOVE" })
      .mockReturnValueOnce({ movement: "MOVE" })
      .mockReturnValueOnce({ movement: "LEFT" })
      .mockReturnValueOnce({ movement: "MOVE" })
      .mockReturnValueOnce({ movement: "REPORT" });
    const result = await question();

    expect(result).toEqual("3,3,NORTH");
  });
});
