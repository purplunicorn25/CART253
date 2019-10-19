"use strict";

// Pong
// by Pippin Barr
// &
// Anne Boutet
//
// A Yin Yang version of the game Pong where darkness and tries to overcome light and vice-versa
// just the ability to play the game with the keyboard.
//
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle

// We always display the paddles and ball so it looks like Pong!
let displayComponents = true;

// Whether the game has started
let starting = true;

// When the game is active
let playing = false;

//Wether the game has ended
let gameOver = false;

// We will only use two colors for this whole Game
let darkColor = 0; // black
let brightColor = 255; // white

// Game colors (using hexadecimal)
let bgColorLeft = brightColor;
let fgColorLeft = darkColor;
let bgColorRight = darkColor;
let fgColorRight = brightColor;

// Keep scores of leftPlayer and rightPlayer
// They both start with no point
let backgroundScoreDisplay = 0;
let leftPlayerScore = 0;
let rightPlayerScore = 0;
let winningScore = 5;
let startingScore = 0;

// BALL

// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  size: 30,
  vx: 0,
  vy: 0,
  speed: 5,
  minSpeed: 2.5,
  maxSpeed: 6
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, speed, minSpeed and maxSpeed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 4,
  upKey: 38,
  downKey: 40,
  minSpeed: 2.5,
  maxSpeed: 6,
  maxNegSpeed: -6
}

// LEFT BACKGROUND

// Left side background with its position properties
let leftRectangleBackground = {
  x: 0,
  y: 0,
  width: 0
}

// RIGHT BACKGROUND

// Right side background with its position properties
let rightRectangleBackground = {
  x: 0,
  y: 0,
  width: 0
}

// Font used for gameOverScreen quotes
let gameOverFont;

// A variable to hold the beep sound we will play on bouncing
let beepSFX;

// If the ball is right at the center of the background divisin it is a half circle
let middleBallImage;
// StartScreen images
let leftSideImage;
let rightSideImage;
let leftTitle;
let rightTitle;
let title;
let instruction;

// preload()
//
// Loads the beep audio for the sound of bouncing
// Loads the images for the ball, fonts and the starting screen
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  middleBallImage = loadImage("assets/images/half_ball.png");
  leftSideImage = loadImage("assets/images/YIN.png");
  rightSideImage = loadImage("assets/images/YANG.png");
  leftTitle = loadImage("assets/images/YIN2.png");
  rightTitle = loadImage("assets/images/YANG2.png");
  title = loadImage("assets/images/PONG.png");
  instruction = loadImage("assets/images/Instructions.png");
  gameOverFont = loadFont("assets/fonts/SourceSansPro-Bold.ttf");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();

  setupPaddles();
  resetBall();
  setupBackground();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w * 2;
  rightPaddle.y = height / 2;
}

// setupBackground()
//
// Sets the inital positions and width of the two background rectangles
function setupBackground() {
  // Initialise leftRectangleBackground's position and their width
  leftRectangleBackground.x = 0;
  leftRectangleBackground.y = 0;
  leftRectangleBackground.width = width / 2;
  // Initialise rightRectangleBackground's position and their width
  rightRectangleBackground.x = 0;
  rightRectangleBackground.y = 0;
  rightRectangleBackground.width = width;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  // Fill the background according to the players' scores
  // Make left and right side backgrounds contrast
  // Right Side
  rightBackground();
  // Left side
  leftBackground();

  if (starting) {
    // Otherwise we display the message to start the game
    displayStartMessage();
  } else if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    // We also want to keep track of the score
    leftBackgroundScoreDisplay();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    // If the players' score equals winningScore end gameOver
    endGame();

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      console.log("out of bound");
      // If it went off either side, reset it
      resetBall();
    }
    // This is where we would likely count points, depending on which side
    // the ball went off...
  } else if (gameOver) {
    // Show the game over screen if any player won
    gameOverScreen();
  }
  // We always display the paddles and ball so it looks like Pong!
  // Define their respective colors
  if (displayComponents) {
    fill(fgColorLeft);
    displayPaddle(leftPaddle);
    fill(fgColorRight);
    displayPaddle(rightPaddle);
    displayBall();
  }
}
// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {

  // Update the ball's position based on velocity
  // The velocity's direction depends on the score of the Players
  if (leftPlayerScore < rightPlayerScore) {
    ball.x += ball.vx;
    ball.y += ball.vy;
  } else if (leftPlayerScore > rightPlayerScore) {
    ball.x -= ball.vx;
    ball.y -= ball.vy;
  } else {
    ball.x += ball.vx;
    ball.y += ball.vy;
  }
}

// leftBackground()
//
// The bright side grows wider as leftPlayerScore goes up
function leftBackground() {
  push();
  // This is the bright side
  fill(brightColor);
  // Position is set at the corner of the rectangle
  rectMode(CORNER);
  rect(leftRectangleBackground.x, leftRectangleBackground.y, leftRectangleBackground.width, height);
  pop();
}

// ScoreDisplay
//
// Adjust the width of the leftRectangleBackground to show score
function leftBackgroundScoreDisplay() {
  // Set the different positions of the leftBackground
  // If there is an equality
  let equal = width * .5;
  // If winning
  let won1Point = width * .6;
  let won2Points = width * .7;
  let won3Points = width * .8;
  let won4Points = width * .9;
  let won5Points = width;
  // If losing
  let lost1Point = width * .4;
  let lost2Points = width * .3;
  let lost3Points = width * .2;
  let lost4Points = width * .1;
  let lost5Points = 0;

  // Make the two sides absolutly equal if the score is 0
  // Move the leftRectangleBackground to the right and make it wider if winning
  // Move the leftRectangleBackground to the left to make it narrower if losing
  if (backgroundScoreDisplay === 0) {
    leftRectangleBackground.width = equal;
  } else if (backgroundScoreDisplay === 1) {
    leftRectangleBackground.width = won1Point;
  } else if (backgroundScoreDisplay === 2) {
    leftRectangleBackground.width = won2Points;
  } else if (backgroundScoreDisplay === 3) {
    leftRectangleBackground.width = won3Points;
  } else if (backgroundScoreDisplay === 4) {
    leftRectangleBackground.width = won4Points;
  } else if (backgroundScoreDisplay === 5) {
    leftRectangleBackground.width = won5Points;
  } else if (backgroundScoreDisplay === -1) {
    leftRectangleBackground.width = lost1Point;
  } else if (backgroundScoreDisplay === -2) {
    leftRectangleBackground.width = lost2Points;
  } else if (backgroundScoreDisplay === -3) {
    leftRectangleBackground.width = lost3Points;
  } else if (backgroundScoreDisplay === -4) {
    leftRectangleBackground.width = lost4Points;
  } else if (backgroundScoreDisplay === -5) {
    leftRectangleBackground.width = lost5Points;
  }
}

// rightBackground()
//
// The dark side cover the screen (left is on top)
function rightBackground() {
  push();
  // This is the dark side
  fill(darkColor);
  // Position is set at the corner of the rectangle
  rectMode(CORNER);
  rect(rightRectangleBackground.x, rightRectangleBackground.y, width, height);
  pop();
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going off the sides
  // If it goes of the left side, add 1 point to rightPlayerScore and deduce 1 point from leftPlayerScore
  // If it goes of the right side, add 1 point to leftPlayerScore and deduce 1 point from rightPlayerScore
  // Count score from - winningScore to winningScore for background
  startingScore = -winningScore;

  if (ball.x < 0) {
    rightPlayerScore = rightPlayerScore + 1;
    leftPlayerScore = leftPlayerScore - 1;
    // Players' scores cannot go below startingScore
    rightPlayerScore = constrain(rightPlayerScore, startingScore, winningScore);
    leftPlayerScore = constrain(leftPlayerScore, startingScore, winningScore);

    backgroundScoreDisplay = backgroundScoreDisplay - 1;
    // backgroundScoreDisplay range from - winningScore to winningScore
    backgroundScoreDisplay = constrain(backgroundScoreDisplay, -winningScore, winningScore);
    return true;
  } else if (ball.x > width) {
    rightPlayerScore = rightPlayerScore - 1;
    leftPlayerScore = leftPlayerScore + 1;
    // Players' scores cannot go below startingScore
    rightPlayerScore = constrain(rightPlayerScore, startingScore, winningScore);
    leftPlayerScore = constrain(leftPlayerScore, startingScore, winningScore);

    backgroundScoreDisplay = backgroundScoreDisplay + 1;
    // backgroundScoreDisplay range from - winningScore to winningScore
    backgroundScoreDisplay = constrain(backgroundScoreDisplay, -winningScore, winningScore);
    return true;
  } else {
    return false;
  }
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayBall()
//
// Draws the ball on screen as a ellipse that is constrasted by the background
function displayBall() {

  // Draw the ball
  // Fill the ball according to the background fill (opposite) with middleBallImage
  push();
  if (ball.x > leftRectangleBackground.width) {
    fill(brightColor);
    ellipse(ball.x, ball.y, ball.size, ball.size);
  } else if (ball.x < leftRectangleBackground.width) {
    fill(darkColor);
    ellipse(ball.x, ball.y, ball.size, ball.size);
  } else if (ball.x === leftRectangleBackground.width) {
    imageMode(CENTER)
    image(middleBallImage, ball.x, ball.y);
  }
  pop();
}

// resetBall()
//
// Sets the starting position and velocity of the ball, send the ball to the winning side
function resetBall() {
  // Initialise the ball's position and velocity
  ball.x = width / 2;
  ball.y = height / 2;
  //
  ball.vx = random(ball.minSpeed, ball.maxSpeed);
  ball.vy = random(ball.minSpeed, ball.maxSpeed);
}

// displayStartMessage()
//
// Shows a message about how to start the game
// Conceptualize the Yin Yang theme with images
function displayStartMessage() {

  push();
  imageMode(CENTER);
  // Images and titles for each side
  image(leftSideImage, width / 4, height / 4);
  image(leftTitle, width / 4, height * 3 / 5);
  image(rightSideImage, width * 3 / 4, height / 4);
  image(rightTitle, width * 3 / 4, height * 3 / 5);
  // Title and Instructions
  image(title, width / 2, height * 4 / 5);
  image(instruction, width / 2, height * .9);
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  starting = false;
  playing = true;
}

// gameOverScreen()
//
// If a player score is equal the winning score the game ends.
function endGame() {
  // If left player wins
  if (leftPlayerScore === winningScore) {
    gameOver = true;
    playing = false;
    displayComponents = false;
    background(brightColor);
  } else if (rightPlayerScore === winningScore) {
    gameOver = true;
    playing = false;
    displayComponents = false;
    background(darkColor);
  }
}

// gameOverScreen()
//
// If game over display the winners gameOverScreen
function gameOverScreen() {

  // If left player wins
  if (leftPlayerScore === winningScore) {
    push();
    fill(brightColor);
    rectMode(CENTER);
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    fill(darkColor);
    textFont(gameOverFont);
    textSize(45);
    text("YIN WON!", width / 2, height * .2);
    textSize(32);
    text('“Darkness cannot drive out darkness: \n only light can do that. \n Hate cannot drive out hate: \n only love can do that.”"', width / 2, height / 2);
    textSize(20);
    text("- Martin Luther King Jr-", width / 2, height * .7);
    pop();
  }
  // If right player wins
  else if (rightPlayerScore === winningScore) {
    push()
    fill(darkColor);
    rectMode(CENTER);
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    fill(brightColor);
    textFont(gameOverFont);
    textSize(45);
    text("YANG WON!", width / 2, height * .2);
    textSize(32);
    text('“I do not speak as I think, \n I do not think as I should, \n and so it all goes on in helpless darkness.”', width / 2, height / 2);
    textSize(20);
    text("- Franz Kafka -", width / 2, height * .65);
    pop();
  }
}