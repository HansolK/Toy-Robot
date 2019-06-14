# Xplor Code Challenge

## Challenge

- The application is a simulation of a toy robot moving on a square tabletop,
  of dimensions 5 units x 5 units.
- There are no other obstructions on the table surface.
- The robot is free to roam around the surface of the table, but must be
  prevented from falling to destruction. Any movement that would result in the
  robot falling from the table must be prevented, however further valid
  movement commands must still be allowed.

## How to run:

**install dependencies**

```sh
yarn
```

**run**

```sh
yarn start
```

## How to test:

```sh
yarn jest
```

## Technologies used

- Node/JS
- Prompts
- Jest

## About my approach

The first challenge I had was setting up a nice user experience to get input from the user. I opted to use the library `prompts` since it had really nice support for custom validation.

The next challenge I had was building the command line tool in a way to help make it easy to test.
Although `prompts` said it had support for testing, I had trouble using their testing api. So I just used jest's `mock` feature instead.
To support easier testing I have exported a number of functions from both my `index.js` and `number.js` files, so that each unit can be tested by itself.
Then for the main "program" function, I have tested the general flow of the user entering in a number of valid commands to confirm that the robot ends in the correct location.
