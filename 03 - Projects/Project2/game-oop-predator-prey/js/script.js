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

// Our predator
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

// The preys
let sheet;
// Create an array to combine all the sheet images at setup
let sheetAvatars = [];
// Define how many display at setup
// (Number of pages in the 25th symphony of Mozart)
let numPrey = 49;
// An empty array to store preys in
let prey = [];

// The obstacles
let walker;
// Create an array to combine all the walkers images at setup
let walkerAvatarsLeft = [];
let walkerAvatarsRight = [];
// An empty array to store Obstacles in
let obstacle = [];
let numLeftWalker = 3;
let numRightWalker = 3;

// The Decoration
let leaf;
// Create an array to combine all the leaf images at setup
let leafAvatars = [];

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

  // // Obstacles left
  // for (let i = 0; i < 2; i++) {
  //   let fileName = "assets/images/leftWalker" + i + ".png";
  //   walkerAvatarsLeft.push(loadImage(fileName));
  // }

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
  backgroundDisplay();

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
  for (let i = 0; i < numRightWalker; i++) {
    // Generate (mostly) random values for the arguments of the obstacles constructor
    let walkerX = -200 * i;
    let walkerY = random(0, height);
    let walkerSpeed = random(1, 3);
    let walkerAvatar = floor(random() * walkerAvatarsRight.length);
    let movingHats = walkerAvatarsRight[walkerAvatar];
    // Create a new Obstacle object with the random values
    let newObstacle = new Obstacle(walkerX, walkerY, walkerSpeed, movingHats);
    // Add the new Obtacle object to the arrays
    obstacle.push(newObstacle);
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

  backgroundDisplay();

  if (playing) {
    startScreen();
  } else if (!gameOver) {
    // MOZART
    // Handle input for mozart
    mozart.handleInput();
    // Move mozart
    mozart.move();
    // Display mozart
    mozart.display();
    // Display mozart's score
    displayScore();

    // Move and Display the preys
    // Track interactions with the predator
    for (let i = 0; i < prey.length; i++) {
      prey[i].move();
      prey[i].display();
      // Handle the predators eating any of the prey
      mozart.handleEating(prey[i]);
    }

    // Move and Display the obstacles
    // Track te interactions with the predator
    for (let i = 0; i < obstacle.length; i++) {
      obstacle[i].move();
      obstacle[i].display();
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

}

// endScreen()
//
// Display the score and allow the player to start again
function endScreen() {

}

// backgroundDisplay()
//
// Setup the background image
function backgroundDisplay() {
  image(backgroundImage, 0, 0);
}

// displayScore()
//
// Display the amount of preys left to catch
function displayScore() {
  // Text properties
  push();
  stroke(100);
  fill(255);
  textSize(22);
  textFont(cursiveFont);
  // Fix position for the text
  let scoreTextX = width - 200;
  let scoreTextY = 30;
  // Distinct the plural and the singular form for the text
  if (mozart.score > 1) {
    scoreTextPlural = mozart.score + " pages missing";
    text(scoreTextPlural, scoreTextX, scoreTextY);
  } else {
    scoreTextSingular = mozart.score + " page missing";
    text(scoreTextSingular, scoreTextX, scoreTextY);
  }
  pop();
}