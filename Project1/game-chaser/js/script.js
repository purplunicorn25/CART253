"use strict";

/******************************************************

Game - Chaser
Pippin Barr
&
ANNE BOUTET

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// PLayer forms
let sleeve1;
let sleeve2;
let sleeve3;
let sleeve4;
// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 40;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 2;
let playerTurboSpeed = 6;
// Player health
let playerHealth;
let playerMaxHealth = 250;
// LifeBar
let lifeLevel;
let barWidth;
// Player fill color
let playerFill = 50;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 25;
let preyVX;
let preyVY;
let tx;
let ty;
let preyMaxSpeed = 4;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;
let preySleeve;
let preySleeveX;
let preySleeveY;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;
// Customize game Over display
let gameOverImage;
let gameOverFont;
// Set background
let backgroundImage;

  function preload() {
    sleeve1 = loadImage("assets/images/EARTH_1.png");
    sleeve2 = loadImage("assets/images/EARTH_2.png");
    sleeve3 = loadImage("assets/images/EARTH_3.png");
    sleeve4 = loadImage("assets/images/EARTH_4.png");
    gameOverImage = loadImage("assets/images/EARTH_5.png");
    preySleeve = loadImage("assets/images/GRETA.png");
    gameOverFont = loadFont("assets/fonts/PermanentMarker-Regular.ttf");
    backgroundImage = loadImage("assets/images/night_sky.jpg"); //https://www.nasa.gov/feature/goddard/2019/hubble-astronomers-assemble-wide-view-of-the-evolving-universe
}
  // setup()
  //
  // Sets up the basic elements of the game
  function setup() {
    createCanvas(500, 500);

    noStroke();

    // We're using simple functions to separate code out
    setupPrey();
    setupPlayer();
  }

  // setupPrey()
  //
  // Initialises prey's position, velocity, and health
  function setupPrey() {
    preyX = width / 5;
    preyY = height / 2;
    preyVX = -preyMaxSpeed;
    preyVY = preyMaxSpeed;
    preyHealth = preyMaxHealth;
  }

  // setupPlayer()
  //
  // Initialises player position and health
  function setupPlayer() {
    playerX = 4 * width / 5;
    playerY = height / 2;
    playerHealth = playerMaxHealth;

    tx = random(0, 1000);
    ty = random(0, 1000);
  }

  // draw()
  //
  // While the game is active, checks input
  // updates positions of prey and player,
  // checks health (dying), checks eating (overlaps)
  // displays the two agents.
  // When the game is over, shows the game over screen.
  function draw() {

  image(backgroundImage, width/2, height/2);


    if (!gameOver) {
      handleInput();

      movePlayer();
      movePrey();

      updateHealth();
      checkEating();
      healthBar();

      drawPrey();
      drawPlayer();
    } else {
      showGameOver();
    }
  }
  // handleInput()
  //
  // Checks arrow keys and adjusts player velocity accordingly
  function handleInput() {

    // Horizontal movement wiht turbo speed
    if (keyIsDown(RIGHT_ARROW) && keyIsDown(32)) {
      playerVX = playerTurboSpeed;
    } else if (keyIsDown(LEFT_ARROW) && keyIsDown(32)) {
      console.log("BOOSTED LEFT");
      playerVX = -playerTurboSpeed;
    } // Check for horizontal movement
    else if (keyIsDown(LEFT_ARROW)) {
      console.log("GOING LEFT");
      playerVX = -playerMaxSpeed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      playerVX = playerMaxSpeed;
    } else {
      playerVX = 0;
    }

    // Vertical movement with turbo speed
    if (keyIsDown(UP_ARROW) && keyIsDown(32)) {
      playerVY = -playerTurboSpeed;
    } else if (keyIsDown(DOWN_ARROW) && keyIsDown(32)) {
      playerVY = playerTurboSpeed;
    } // Check for vertical movement
    else if (keyIsDown(UP_ARROW)) {
      playerVY = -playerMaxSpeed;
    } else if (keyIsDown(DOWN_ARROW)) {
      playerVY = playerMaxSpeed;
    } else {
      playerVY = 0;
    }
  }

  // movePlayer()
  //
  // Updates player position based on velocity,
  // wraps around the edges.
  function movePlayer() {
    // Update position
    playerX = playerX + playerVX;
    playerY = playerY + playerVY;
    // Wrap when player goes off the canvas
    if (playerX < 0) {
      // Off the left side, so add the width to reset to the right
      playerX = playerX + width;
    } else if (playerX > width) {
      // Off the right side, so subtract the width to reset to the left
      playerX = playerX - width;
    }

    if (playerY < 0) {
      // Off the top, so add the height to reset to the bottom
      playerY = playerY + height;
    } else if (playerY > height) {
      // Off the bottom, so subtract the height to reset to the top
      playerY = playerY - height;
    }
  }

  // updateHealth()
  //
  // Reduce the player's health (happens every frame)
  // Check if the player is dead
  function updateHealth() {
    // Reduce playerHealth faster if using playerTurboSpeed
    if (playerVX >= playerTurboSpeed || playerVY >= playerTurboSpeed) {
      playerHealth = playerHealth - 3;
    } else {
      // Reduce player health
      playerHealth = playerHealth - 0.5;
    }
    // Constrain the result to a sensible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Check if the player is dead (0 health)
    if (playerHealth === 0) {
      // If so, the game is over
      gameOver = true;
    }
  }

  // healthBar
  //
  // Display the player's health with a life Bar
  function healthBar() {
    //Display bar on the right side of the canvas.
    // It has four levels: green, yellow, orange and red.
    barWidth = 10;
    lifeLevel = playerHealth; // Ration between playerHealth and canvas. *playerMaxHealth = 250; Canvas = 500*
    rectMode(CENTER);

    if (playerHealth >= playerMaxHealth - playerMaxHealth / 5) { // > 200
      fill("#39B54A"); // Green
      noStroke();
      rect(width - barWidth / 2, height, barWidth, lifeLevel * 4);
    } else if (playerHealth < playerMaxHealth - playerMaxSpeed / 5 && playerHealth > playerMaxHealth - playerMaxHealth / 2) { // < 199 > 124
      fill("#FFDE17"); // Yellow
      noStroke();
      rect(width - barWidth / 2, height, barWidth, lifeLevel * 4);
    } else if (playerHealth <= playerMaxHealth - playerMaxHealth / 2 && playerHealth >= playerMaxHealth - playerMaxHealth / 1.25) { // < 125 > 50
      fill("#F15A29"); // Orange
      noStroke();
      rect(width - barWidth / 2, height, barWidth, lifeLevel * 4);
    } else { // < 49
      fill("#ED1C24"); // Red
      noStroke();
      rect()
      rect(width - barWidth / 2, height, barWidth, lifeLevel * 4);
    }
  }
  // checkEating()
  //
  // Check if the player overlaps the prey and updates health of both
  function checkEating() {
    // Get distance of player to prey
    let d = dist(playerX, playerY, preyX, preyY);
    // Check if it's an overlap
    if (d < playerRadius + preyRadius) {
      // Increase the player health
      playerHealth = playerHealth + eatHealth;
      // Constrain to the possible range
      playerHealth = constrain(playerHealth, 0, playerMaxHealth);
      // Reduce the prey health
      preyHealth = preyHealth - eatHealth;
      // Constrain to the possible range
      preyHealth = constrain(preyHealth, 0, preyMaxHealth);

      // Check if the prey died (health 0)
      if (preyHealth === 0) {
        // Move the "new" prey to a random position
        preyX = random(0, width);
        preyY = random(0, height);
        // Give it full health
        preyHealth = preyMaxHealth;
        // Track how many prey were eaten
        preyEaten = preyEaten + 1;
      }
    }
  }

  // movePrey()
  //
  // Moves the prey based on random velocity changes
  function movePrey() {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    //
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    preyVX = map(noise(tx), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    preyVY = map(noise(ty), 0, 1, -preyMaxSpeed, preyMaxSpeed);

    // Update prey position based on velocity
    preyX = preyX + preyVX;
    preyY = preyY + preyVY;

    tx += 0.02;
    ty += 0.02;

    // Screen wrapping
    if (preyX < 0) {
      preyX = preyX + width;
    } else if (preyX > width) {
      preyX = preyX - width;
    }

    if (preyY < 0) {
      preyY = preyY + height;
    } else if (preyY > height) {
      preyY = preyY - height;
    }
  }

  // drawPrey()
  //
  // Draw the prey as an ellipse with alpha based on health
  function drawPrey() {

    preySleeveX = preyX;
    preySleeveY = preyY;

    // fill(preyFill, preyHealth);
    // ellipse(preyX, preyY, preyRadius * 2);
    imageMode(CENTER);
    image(preySleeve, preyX, preyY, preyRadius * 4, preyRadius * 4);
  }

  // drawPlayer()
  //
  // Draw the player as an ellipse with alpha value based on health
  function drawPlayer() {

    if (playerHealth >= playerMaxHealth - playerMaxHealth / 5) { // > 200
      image(sleeve1, playerX, playerY, playerRadius * 2, playerRadius * 2);
    } else if (playerHealth < playerMaxHealth - playerMaxSpeed / 5 && playerHealth > playerMaxHealth - playerMaxHealth / 2) { // < 199 > 124
      image(sleeve2, playerX, playerY, playerRadius * 2, playerRadius * 2);
    } else if (playerHealth <= playerMaxHealth - playerMaxHealth / 2 && playerHealth >= playerMaxHealth - playerMaxHealth / 1.25) { // < 125 > 50
      image(sleeve3, playerX, playerY, playerRadius * 2, playerRadius * 2);
    } else { // < 49
      image(sleeve4, playerX, playerY, playerRadius * 2, playerRadius * 2);
    }
  }

  // showGameOver()
  //
  // Display text about the game being over!
  function showGameOver() {
    // Display dead planet
    image(gameOverImage, width / 2, height / 4, gameOverImage.width / 3.5, gameOverImage.height / 3.5);
    // Set up the font
    textSize(32);
    textFont(gameOverFont);
    stroke(255);
    strokeWeight(4);
    textAlign(CENTER, CENTER);
    fill(255,0,0);
    // Set up the text to display
    let gameOverText = "YOU FAILED \n TO SAVE OUR PLANET\n"; // \n means "new line"
    gameOverText = gameOverText + "You picked up " + preyEaten + " Greta\n";
    gameOverText = gameOverText + "before we all died.";
    // Display it in the centre of the screen
    text(gameOverText, width / 2, height * 2/3);
  }
