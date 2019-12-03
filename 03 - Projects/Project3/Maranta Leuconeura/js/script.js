let windowWall;

let offsetTargetX = 0;
let timeFrameInterval = 500;

// TIME FRAMES
let sun0;
let night1;
let rain2;
let night3;
let sun4;
let night5;
let sun6;
let night7;
let snow8;
let night9;
let sun10;
// Empty array to store them in
let weather = [];

// NIGHTSKY
let star;
// Define how many star are to be displayed
let numStars = 500;
// An empty array to store stars in
let nightSky = [];
// Treshold
let night = false;

// RAIN
let drop;
// Define how may drops are to be displayed
let numDrops = 300;
// An empty array to store drops in
let rain = [];
// Treshold
let raining = false;

// OTHER IMAGES
// mouse avatar
let fly;

// preload()
//
// Load assets before the game starts
function preload() {
  windowWall = loadImage("assets/images/window.png");
  fly = loadImage("assets/images/fly.png");
}

// setup()
//
// Sets up a canvas
// Creates objects for the plant and outdoor scenes
function setup() {
  createCanvas(500, 600);
  // NIGHTSKY
  // Set the initial position and properties of the stars
  setupNightSky();
  // RAIN
  // Set the initial position and properties of timeFrames
  setupTimeFrames();
}

// draw()
//
// Handles sceneries, movement and interractions
// The game starts, the player plays and the game ends
function draw() {
  // All the sceneries are updated at the same time
  // They are displayed and move to the left in an infinite loop
  displayTimeFrames();

  if (night === true) {
    displayNightSky();
  }

  // Update the wall background as the game runs
  // After all the outdoor scenes
  wallCanvas();
  mouseAvatar();
}

// setupNightSky()
//
// Set the initial position and properties of the stars
function setupNightSky() {
  for (let i = 0; i < numStars; i++) {
    // Generate (mostly) random values for the arguments of the NightSky constructor
    starX = random(0, width);
    starY = random(0, height);
    starRadius = random(.3, .8);
    reductionRate = random(-0.02, -0.005);
    growingRate = 0.01;
    nightX = width / 2;
    nightY = height / 2;
    nightWidth = width;
    nightHeight = height;
    // Create a new NightSky object with the random values
    let newStar = new NightSky(starX, starY, starRadius, reductionRate, growingRate, nightX, nightY, nightWidth, nightHeight);
    // Add the new star to the array
    nightSky.push(newStar);
  }
}

// displayNightSky()
//
// Display the nightSky with background and stars
function displayNightSky() {
  background(0);
  for (let i = 0; i < nightSky.length; i++) {
    nightSky[i].display();
    nightSky[i].size();
  }
}

// setupRain()
//
// Set the initial position and properties of the rain
function setupRain() {
  for (let i = 0; i < numDrops; i++) {}
}

// mouseAvatar()
//
// Set an image to be the mouse avatar
// Its position follows mouseX and mouseY
function mouseAvatar() {
  push();
  imageMode(CENTER);
  image(fly, mouseX, mouseY, 35, 35);
  pop();
}

// wallCanvas()
//
// The image acts like a stencil that create a wall like effect
function wallCanvas() {
  push();
  imageMode(CENTER);
  image(windowWall, width / 2, height / 2);
  pop();
}

// timeFramesSetup()
//
// Create all object that are used as time frames
// Rain, NightSky, Snow, and Sun objects
// Store them in an array
function setupTimeFrames() {
  sun0 = new Rain(offsetTargetX + timeFrameInterval * 0, color(255, 255, 0));
  night1 = new Rain(offsetTargetX + timeFrameInterval * 1, color(0));
  rain2 = new Rain(offsetTargetX + timeFrameInterval * 2, color(0, 0, 255));
  night3 = new Rain(offsetTargetX + timeFrameInterval * 3, color(0));
  sun4 = new Rain(offsetTargetX + timeFrameInterval * 4, color(255, 255, 0));
  night5 = new Rain(offsetTargetX + timeFrameInterval * 5, color(0));
  sun6 = new Rain(offsetTargetX + timeFrameInterval * 6, color(255, 255, 0));
  night7 = new Rain(offsetTargetX + timeFrameInterval * 7, color(0));
  snow8 = new Rain(offsetTargetX + timeFrameInterval * 8, color(255));
  night9 = new Rain(offsetTargetX + timeFrameInterval * 9, color(0));

  // Store them in an array
  weather.push(sun0);
  weather.push(night1);
  weather.push(rain2);
  weather.push(night3);
  weather.push(sun4);
  weather.push(night5);
  weather.push(sun6);
  weather.push(night7);
  weather.push(snow8);
  weather.push(night9);
}

// displayTimeFrames()
//
// Display the time frames all at the same setTimeout(function () {
function displayTimeFrames() {
  for (let i = 0; i < weather.length; i++) {
    weather[i].background();
    weather[i].backgroudTranslation();
  }
}