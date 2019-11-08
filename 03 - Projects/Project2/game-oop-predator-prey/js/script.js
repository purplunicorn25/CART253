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
let startBackgroundImage;
let endBackgroundImage;

// Sound properties
let inGameMusic;
let collisionSound;

// Fonts
let cursiveFont;

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
let drop;
// Define how many are displayed at Setup
let numDrops = 120;
// An empty array to store drops in
let decorations = [];
// Timer for the rain to start
let rainStartTime;
let rainTimePassed = 0;
let rainStartInterval = 15000; // Every 15 seconds
let rainStopInterval = 25000; // After 10 seconds

// // RAIN SCORE
// // Set a score for the number of time it rained
// // before the player catches all preys
// let scoreTime;
// let initialScoreTime = -25000;
// let initialScore = 0;
// let scoreTimeInterval = 40000;

// preload()
//
// Load assets before the game starts
function preload() {
  // Load the background image
  backgroundImage = loadImage("assets/images/pavee_632KB.jpg");
  startBackgroundImage = loadImage("assets/images/StartScreenBCKGRND_96.6KB.jpg");
  endBackgroundImage = loadImage("assets/images/EndScreenBCKGRND_59.8KB.jpg");

  // Load the sounds and music
  inGameMusic = loadSound("assets/sounds/Symphony_No.25_Gminor.mp3");
  collisionSound = loadSound("assets/sounds/collision.wav");

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
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {

  createCanvas(1000, 500);

  // PREDATOR
  mozart = new Predator(250, 250, 3, 60, predatorAvatarE, predatorAvatarW, predatorAvatarN, predatorAvatarS, predatorAvatarNE, predatorAvatarSE, predatorAvatarNW, predatorAvatarSW);

  // PREY
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

  // OBSTACLE
  // Sets the initial position and properties of the Obstacles
  // RIGHT: The ones going to the right
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
  // LEFT: The ones going to the left
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

  // DECORATION
  // Set the inital position and properties of the decoration
  for (let i = 0; i < numDrops; i++) {
    // Generate (mostly) random values for the arguments of the Decoration constructor
    let dropX = random(0, width);
    let dropY = random(0, height);
    let dropRadius = random(5, 10);
    // Create a new Decoration object with the random values
    let drop = new Decoration(dropX, dropY, dropRadius);
    // Add the new Decoration object to the array
    decorations.push(drop);
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
// The game starts, the player plays and the game ends
function draw() {

  if (!playing) {
    // Display Title and instructions
    startScreen();
  } else if (!gameOver) {
    // Set an ambiance with music
    if (!inGameMusic.isLooping()) {
      // Loop the music
      inGameMusic.loop();
    }

    // Set the background
    background(backgroundImage, 0, 0);

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

    // SHEETS
    // Move and Display the preys
    // Track interactions with the predator
    for (let i = 0; i < prey.length; i++) {
      prey[i].move();
      prey[i].display();
      // Handle the predators eating any of the prey
      mozart.handleEating(prey[i]);
    }

    // WALKERS
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
    // If Mozart overlap a Walker object
    // all the Sheets objects are displayed again
    // RIGHT: Move and display right walkers
    // If offscreen, reset its position
    for (let i = 0; i < rightObstacle.length; i++) {
      //Check it Mozart overlaps an obstacle
      if (mozart.handleCollision(rightObstacle[i]) === true) {
        // PLay a sound
        if (!collisionSound.isPlaying()) {
          collisionSound.play();
        }
        // If true, display all the preys again
        for (let i = 0; i < prey.length; i++) {
          prey[i].caught = false;
          // Reset size
          prey[i].reset();
          // Reset score
          mozart.scoreReset();
        }
      }
      // If offscreen, reset its position
      if (rightObstacle[i].offScreenRight() === true) {
        //reset to initial position
        rightObstacle[i].resetRight();
      }
    }
    // LEFT: Move and display left walkers
    // If offscreen, reset walker position
    for (let i = 0; i < leftObstacle.length; i++) {
      //Check it Mozart overlaps an obstacle
      if (mozart.handleCollision(leftObstacle[i]) === true) {
        // PLay a sound
        if (!collisionSound.isPlaying()) {
          collisionSound.play();
        }
        // Display all the preys again
        for (let i = 0; i < prey.length; i++) {
          prey[i].caught = false;
          // Reset size
          prey[i].reset();
          // Reset score
          mozart.scoreReset();
        }
      }
      // If offscreen, reset walker position
      if (leftObstacle[i].offScreenLeft() === true) {
        // Reset to the other side of the screen (left)
        leftObstacle[i].resetLeft();
      }
    }

    // DROPS
    // At every interval, make it rain
    // Define time passed (millis started from 0 at playing (mousePressed))
    rainTimePassed = millis() - rainStartTime;
    // Always update the drop radius and reset()
    // so that drops don't all appear at the same time
    for (let i = 0; i < numDrops; i++) {
      decorations[i].display();
      decorations[i].reduceSize();

      // If the interval has passed
      if (rainTimePassed > rainStartInterval) {
        // Display drops
        decorations[i].raining = true;
        // Count the number of time it rained
        decorations[i].addOnePoint = true;
        console.log(decorations[0].score);
      }
      if (rainTimePassed > rainStopInterval) {
        // Do not display drops
        for (let i = 0; i < numDrops; i++) {
          decorations[i].raining = false;
        }
        // Reset timer properties
        rainStartTime = millis();
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
  background(startBackgroundImage, 0, 0);

  // Game Title
  push();
  fill(255, 0, 0);
  stroke(0);
  strokeWeight(1);
  textSize(50);
  textFont(cursiveFont);
  textAlign(CENTER, CENTER);
  let titleX = 600;
  let titleY = 30;
  let title = "Mozart is out of tune";
  text(title, titleX, titleY);
  pop();
  // Instructions
  push();
  fill(0);
  textSize(16);
  textFont(cursiveFont);
  textAlign(CENTER, CENTER);
  let instructionsX = width * 1.86 / 3;
  let instructionsY = 140;
  let instructions = "On this windy day of October, Mozart was walking to the opera.\n";
  let instructions2 = instructions + "A strong blow made him drop his new symphony.\n";
  let instructions3 = instructions2 + "Help him catch it!\n Use arrow keys to move. Avoid ponds and walkers\nthat get in your way.";
  text(instructions3, instructionsX, instructionsY);
  pop();
}

// endScreen()
//
// Display the score and allow the player to start again
function endScreen() {
  background(endBackgroundImage, 0, 0);
  // Game Conclusion
  push();
  fill(255, 0, 0);
  textSize(40);
  textFont(cursiveFont);
  textAlign(CENTER, CENTER);
  let titleX = width / 3;
  let titleY = 300;
  let title = "Congratulations!\nYou collected all 49 pages";
  text(title, titleX, titleY);
  pop();
  // Reset instructions
  push();
  fill(0);
  textSize(28);
  textFont(cursiveFont);
  textAlign(CENTER, CENTER);
  let instructionsX = width / 3;
  let instructionsY = 400;
  let instructions = "Click to start again";
  text(instructions, instructionsX, instructionsY);
  pop();
}

// mousePressed()
//
// Click mouse to start game
function mousePressed() {
  // Start the game
  playing = true;
  // Reset rainStartTime to 0
  rainStartTime = millis();
  // Allow the player to reset the game when he
  if (mozart.score === mozart.endScore) {
    playing = false;
    gameOver = false;
    mozart.score = mozart.initialScore;
  }
}