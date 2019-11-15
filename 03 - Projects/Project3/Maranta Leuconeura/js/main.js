let windowWall;

// NIGHTSKY]
let star;
// Define how many star are to be displayed
let numStars = 20;
// An empty array to store stars in
let nightSky = [];
let mainCanvas;

function preload() {
  windowWall = loadImage("assets/images/window.png");
}

function setup() {

  mainCanvas = createCanvas(500, 600);
  // NIGHTSKY
  // Set the initial position and properties of the stars
  for (let i = 0; i <= 500; i++) {
    // Generate (mostly) random values for the arguments of the NightSky constructor
    starX = random(100, 400);
    starY = random(0, height);
    starRadius = random(1, 3);
    nightX = width / 2;
    nightY = height / 2;
    nightWidth = width;
    nightHeight = height;
    // Create a new NightSky object with the random values
    let newStar = new NightSky(starX, starY, starRadius, nightX, nightY, nightWidth, nightHeight);
    // Add the new star to the array
    nightSky.push(newStar);
  }
}

function draw() {
  background(0);
  for (let i = 0; i <= 20; i++) {
    nightSky[i].display();
    nightSky[i].reduceSize();
  }
  // Update the wall background as the game runs
  push();
  imageMode(CENTER);
  image(windowWall, width / 2, height / 2);
  pop();
}