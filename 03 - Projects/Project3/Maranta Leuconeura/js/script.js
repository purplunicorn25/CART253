let windowWall;

let offsetTargetX = 0;
let timeFrameInterval = 500;

// TIME FRAMES
let sun0; // 0 - 400
let night1; // 500 - 1000
let rain2; // 1000 - 1500
let night3; // 1500 - 2000
let sun4; // 2000 - 2500
let night5; // 2500 - 3000
let cloudy6; // 3000 - 3500
let night7; // 3500 - 4000
let snow8; // 4000 - 4500
let night9; // 4500 - 5000
// Empty array to store them in
let weather = [];

// NIGHTSKY
// Define how many star are to be displayed
let numStars = 500;
// An empty array to store stars in
let stars = [];

// RAIN
// Define how may drops are to be displayed
let numDrops = 1000;
// An empty array to store drops in
let drops = [];

// SUN
let sun;
let rays;

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
  // TIMEFRAMES
  // Set the initial boxes and store them into an array
  setupTimeFrames();
  // NIGHT
  // Set the initial position and properties of the stars
  setupNight();
  // RAIN
  // Set the initial position and properties of the drops
  setupRain();
  // SUN
  // Set the initial position and properties of sun
  setupSun();

}

// draw()
//
// Handles sceneries, movement and interractions
// The game starts, the player plays and the game ends
function draw() {
  // All the sceneries are updated at the same time
  // They are displayed and move to the left in an infinite loop
  // BOXES
  displayTimeFrames();
  // NIGHT
  displayNight();
  // RAIN
  displayRain();
  // SUN
  displaySun();

  // Update the wall background as the game runs
  // After all the outdoor scenes
  wallCanvas();
  mouseAvatar();
}

// setupNightSky()
//
// Set the initial position and properties of the stars
function setupNight() {
  for (let i = 0; i < numStars; i++) {
    // Generate (mostly) random values for the arguments of the Night constructor
    bckgrndX = 0;
    bckgrndColor = color(0);
    starX = random(500, 1000); // night2
    starY = random(0, height);
    moonX = 800;
    moonY = 300;
    starRadius = random(.3, .8);
    reductionRate = random(-0.02, -0.005);
    growingRate = 0.01;
    // Create a new Night object with the random values
    let newStar = new Night(starX, starY, moonX, moonY, starRadius, reductionRate, growingRate);
    // Add the new star to the array
    stars.push(newStar);
  }
}

// displayNight()
//
// Display the stars and the moon of the night sky
function displayNight() {
  // Display, resize and move all the stars
  for (let i = 0; i < stars.length; i++) {
    stars[i].starSize();
    stars[i].starDisplay();
    stars[i].starTranslation();
  }
  // Display and move the moon according to one lucky star
  stars[7].moonDisplay();
  stars[7].moonTranslation();
}

// setupRain()
//
// Set the initial position and properties of the rain
function setupRain() {
  for (let i = 0; i < numDrops; i++) {
    // Generate values for the arguments of the Rain constructor
    dropX = random(1000, 1500);
    dropY = random(0, height);
    intervalX = 0;
    intervalY = 0;
    // Create a new Rain object with the values
    let newDrop = new Rain(dropX, dropY);
    // Add the new drop to the array
    drops.push(newDrop);
  }
}

// displayNight()
//
// Display the stars and the moon of the night sky
function displayRain() {
  // Display, resize and move all the stars
  for (let i = 0; i < drops.length; i++) {
    drops[i].dropDisplay();
    drops[i].dropGravity();
    drops[i].handleWrapping();
    drops[i].dropTranslation();
    drops[i].limitsTranslation();

  }
}

// setupSun()
//
// Set the inital position and properties of the sunny sky
function setupSun() {
  // Create a sun and its rays as Sun objects
  sun = new Sun(220, 200, 100, -.05, .05, 100, 90, color(255, 255, 0));
  rays = new Sun(220, 200, 150, -1, 1, 180, 120, color(255, 255, 0, 80));
}

// displaySun()
//
// Display the sun and its rays
function displaySun() {
  // Display the sun and its functionalities
  sun.display();
  sun.resize();
  sun.translation();
  // Display the rays and their functionalities
  rays.display();
  rays.resize();
  rays.translation();
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
  sun0 = new TimeFrames(offsetTargetX + timeFrameInterval * 0, color(255, 0, 0));
  night1 = new TimeFrames(offsetTargetX + timeFrameInterval * 1, color(0));
  rain2 = new TimeFrames(offsetTargetX + timeFrameInterval * 2, color(0, 0, 255));
  night3 = new TimeFrames(offsetTargetX + timeFrameInterval * 3, color(0));
  sun4 = new TimeFrames(offsetTargetX + timeFrameInterval * 4, color(255, 255, 0));
  night5 = new TimeFrames(offsetTargetX + timeFrameInterval * 5, color(0));
  cloudy6 = new TimeFrames(offsetTargetX + timeFrameInterval * 6, color(100));
  night7 = new TimeFrames(offsetTargetX + timeFrameInterval * 7, color(0));
  snow8 = new TimeFrames(offsetTargetX + timeFrameInterval * 8, color(255));
  night9 = new TimeFrames(offsetTargetX + timeFrameInterval * 9, color(0));

  // Store them in an array
  weather.push(sun0);
  weather.push(night1);
  weather.push(rain2);
  weather.push(night3);
  weather.push(sun4);
  weather.push(night5);
  weather.push(cloudy6);
  weather.push(night7);
  weather.push(snow8);
  weather.push(night9);
}

// displayTimeFrames()
//
// Display the time frames all at the same setTimeout(function () {
function displayTimeFrames() {
  for (let i = 0; i < weather.length; i++) {
    weather[i].backgroundDisplay();
    weather[i].backgroundTranslation();
  }
}