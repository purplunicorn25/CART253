// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Track whether the game as started
let playing = false;
// Track whether the game is over
let gameOver = false;

// Background properties
let backgroundImage;

// PREDATOR
let mozart;
// Create arrays to combine all the prey images at setup
let predatorAvatars = [];
// Display images (cardinal directions)
let predatorAvatarE;
let predatorAvatarW;
let predatorAvatarN;
let predatorAvatarS;

let predatorAvatarNE;
let predatorAvatarSE;
let predatorAvatarNW;
let predatorAvatarSW;

// PREYS
let sheet;
// Create an array to combine all the sheet images at setup
let sheetAvatars = [];
// Define how many display at setup
// (Number of pages in the 25th symphony of Mozart)
let numPrey = 49;
// An empty array to store preys in
let prey = [];

// OBSTACLES
let walker;
// Create an array to combine all the walkers images at setup
let walkerAvatarsLeft = [];
let walkerAvatarsRight = [];
// Define how many display at setup
let numWalker = 3;
// An empty array to store Obstacles in
let rightObstacle = [];
let leftObstacle = [];
// Array of position to avoid overlap of walker
let leftWalkerPositions = [{
  x: 1600,
  y: 100
}, {
  x: 1200,
  y: 300
}, {
  x: 1400,
  y: 500
}];
let rightWalkerPositions = [{
  x: -100,
  y: 0
}, {
  x: -500,
  y: 200
}, {
  x: -300,
  y: 400
}];

// DECORATIONS
let leaf;
// Create an array to combine all the leaf images at setup
let leafAvatars = [];
// Define how many are displayed at Setup
let numLeaves = 45;
// An empty array to store Leaves in
let decorations = [];

// Fonts
let cursiveFont;

// preload()
//
// Load assets before the game starts
function preload() {
  // Load the background image
  backgroundImage = loadImage("assets/images/pavee_632KB.jpg");

  // Load the Fonts
  cursiveFont = loadFont("assets/fonts/BethEllen-Regular.ttf");

  //Load all the avatars for preys, predator, obstacles and decorations
  // Predator
  predatorAvatarE = loadImage("assets/images/predator/mozartE.png");
  predatorAvatarW = loadImage("assets/images/predator/mozartW.png");
  predatorAvatarN = loadImage("assets/images/predator/mozartN.png");
  predatorAvatarS = loadImage("assets/images/predator/mozartS.png");

  predatorAvatarNE = loadImage("assets/images/predator/mozartNE.png");
  predatorAvatarSE = loadImage("assets/images/predator/mozartSE.png");
  predatorAvatarNW = loadImage("assets/images/predator/mozartNW.png");
  predatorAvatarSW = loadImage("assets/images/predator/mozartSW.png");

  // Preys
  for (let i = 0; i < 3; i++) {
    let fileName = "assets/images/sheet" + i + ".png";
    sheetAvatars.push(loadImage(fileName));
  }

  // Obstacles left
  for (let i = 0; i < 2; i++) {
    let fileName = "assets/images/LeftWalker/Hat" + i + ".png";
    walkerAvatarsLeft.push(loadImage(fileName));
  }

  // Obstacles Right
  for (let i = 0; i < 2; i++) {
    let fileName = "assets/images/RightWalker/Hat" + i + ".png";
    walkerAvatarsRight.push(loadImage(fileName));
  }

  // Decorations
  for (let i = 1; i <= 4; i++) {
    let fileName = "assets/images/leaf" + i + ".png";
    leafAvatars.push(loadImage(fileName));
  }
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {

  createCanvas(1000, 500);

  mozart = new Predator(250, 250, 3, 60, predatorAvatarE, predatorAvatarW, predatorAvatarN, predatorAvatarS, predatorAvatarNE, predatorAvatarSE, predatorAvatarNW, predatorAvatarSW);

  // Sets the initial position and properties of the preys
  for (let i = 0; i < numPrey; i++) {
    // Generate (mostly) random values for the arguments of the Prey constructor
    let sheetX = random(0, width);
    let sheetY = random(0, height);
    let sheetSpeed = random(4, 11);
    let sheetAvatar = floor(random() * sheetAvatars.length);
    let musicSheetAvatar = sheetAvatars[sheetAvatar];
    // Create a new Prey objects with the random values
    let newPrey = new Prey(sheetX, sheetY, sheetSpeed, musicSheetAvatar);
    // Add the new Prey object to the array
    prey.push(newPrey);
  }

  // Sets the initial position and properties of the Obstacles
  // The ones going to the right
  for (let i = 0; i < numWalker; i++) {
    // Generate values for the arguments of the obstacles constructor
    let initialWalkerX = rightWalkerPositions[i].x;
    let walkerX = initialWalkerX;
    let initialWalkerY = rightWalkerPositions[i].y;
    let walkerY = initialWalkerY;
    let walkerSpeed = random(2, 3);
    let walkerAvatar = floor(random() * walkerAvatarsRight.length);
    let movingHats = walkerAvatarsRight[walkerAvatar];
    // Create a new Obstacle object with the values
    let newObstacle = new Obstacle(walkerX, walkerY, walkerSpeed, movingHats);
    // Add the new Obtacle object to the array
    rightObstacle.push(newObstacle);
  }
  // The ones going to the left
  for (let i = 0; i < numWalker; i++) {
    // Generate values for the arguments of the obstacles constructor
    let walkerX = leftWalkerPositions[i].x;
    let walkerY = leftWalkerPositions[i].y;
    let walkerSpeed = random(-3, -2);
    let walkerAvatar = floor(random() * walkerAvatarsLeft.length);
    let movingHats = walkerAvatarsLeft[walkerAvatar];
    // Create a new Obstacle object with the values
    let newObstacle = new Obstacle(walkerX, walkerY, walkerSpeed, movingHats);
    // Add the new Obstacle object to the array
    leftObstacle.push(newObstacle);
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

  if (!playing) {
    startScreen();
  } else if (!gameOver) {
    // Set the ground
    backgroundDisplay();

    // MOZART
    // Handle input for mozart
    mozart.handleInput();
    // Move mozart
    mozart.move();
    // Display mozart
    mozart.display();
    // Display mozart's score
    // Check if mozart is winning (score = 0)
    mozart.displayScore();
    mozart.handleWinning();

    // PREYS
    // Move and Display the preys
    // Track interactions with the predator
    for (let i = 0; i < prey.length; i++) {
      prey[i].move();
      prey[i].display();
      // Handle the predators eating any of the prey
      mozart.handleEating(prey[i]);
    }

    // OBSTACLES
    // Move and Display the obstacles
    for (let i = 0; i < rightObstacle.length; i++) {
      rightObstacle[i].move();
      rightObstacle[i].display();
    }
    for (let i = 0; i < leftObstacle.length; i++) {
      leftObstacle[i].move();
      leftObstacle[i].display();
    }
    // Handle the predator overlaping any of the obstacle
    // Track te interactions with the predator
    // If Mozart overlap a Walker object
    // all the Sheets objects are displayed again
    for (let i = 0; i < rightObstacle.length; i++) {
      if (mozart.handleCollision(rightObstacle[i]) === true) {
        // Display all the preys again
        for (let i = 0; i < prey.length; i++) {
          prey[i].caught = false;
          // Reset size
          prey[i].reset();
          // Reset score
          mozart.scoreReset();
        }
      }
    }
    for (let i = 0; i < leftObstacle.length; i++) {
      if (mozart.handleCollision(leftObstacle[i]) === true) {
        // Display all the preys again
        for (let i = 0; i < prey.length; i++) {
          prey[i].caught = false;
          // Reset size
          prey[i].reset();
          // Reset score
          mozart.scoreReset();
        }
      }
    }
    // If obstacle is outside the canvas reset its position
    for (let i = 0; i < rightObstacle.length; i++) {

      console.log(rightObstacle[i].offScreen());

      if (rightObstacle[i].offScreen() === true) {
        for (let i = 0; i < rightObstacle.length; i++) {
          rightObstacle[i].obstacleOffScreen = true;
          //reset to initial position
          rightObstacle[i].reset();
        }
      }
    }
  } else if (gameOver) {
    endScreen();
  }
}
// startScreen()
//
// Sets the concept for the gameOver
// Instructions on how to play
function startScreen() {
  background(255);
  // Game Title
  push();
  fill(255, 0, 0);
  textSize(40);
  textFont(cursiveFont);
  textAlign(CENTER, CENTER);
  let titleX = width / 2;
  let titleY = height / 2;
  let title = "This is a start screen";
  text(title, titleX, titleY);
  pop();
  // Instructions
  push();
  fill(0);
  textSize(20);
  textFont(cursiveFont);
  textAlign(CENTER, CENTER);
  let instructionsX = width / 2;
  let instructionsY = height * 4 / 5;
  let instructions = "These are instructions \n even more instructions \n Oh look! Instructions again";
  text(instructions, instructionsX, instructionsY);
  pop();
}

// endScreen()
//
// Display the score and allow the player to start again
function endScreen() {
  background(255);
  // Game Conclusion
  push();
  fill(255, 0, 0);
  textSize(40);
  textFont(cursiveFont);
  textAlign(CENTER, CENTER);
  let titleX = width / 2;
  let titleY = height / 2;
  let title = "This is an end screen";
  text(title, titleX, titleY);
  pop();
  // Reset instructions
  push();
  fill(0);
  textSize(20);
  textFont(cursiveFont);
  textAlign(CENTER, CENTER);
  let instructionsX = width / 2;
  let instructionsY = height * 4 / 5;
  let instructions = "Click\nto start\nagain";
  text(instructions, instructionsX, instructionsY);
  pop();
}

// backgroundDisplay()
//
// Setup the background image
function backgroundDisplay() {
  image(backgroundImage, 0, 0);
}

// mousePressed()
//
// Click mouse to start game, resets startTime to 0
function mousePressed() {
  // Start the game
  playing = true;
  //leaves.startTimeReset = millis()

  // Allow the player to reset the game when he
  if (mozart.score === mozart.endScore) {
    playing = false;
    gameOver = false;
    mozart.score = mozart.initialScore;
  }
}