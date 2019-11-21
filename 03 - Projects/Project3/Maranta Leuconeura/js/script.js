let windowWall;

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
let raining = true;

// preload()
//
// Load assets before the game starts
function preload() {
  windowWall = loadImage("assets/images/window.png");
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
  // Set the initial position and properties of the rain
  // setupRain();
}

// draw()
//
// Handles sceneries, movement and interractions
// The game starts, the player plays and the game ends
function draw() {
  // Update all the sceneries at the same time
  // Display only one at a time
  if (night === true) {
    displayNightSky();
  }

  // Update the wall background as the game runs
  // After all the outdoor scenes
  push();
  imageMode(CENTER);
  image(windowWall, width / 2, height / 2);
  pop();
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
  for (let i = 0; i < numDrops; i++) {

  }
}