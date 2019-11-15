// "use strict";
/*****************

The (Secret) Journey of a Maranta Leuconeura
Anne Boutet

This is a PROTOTYPE. You must fill in the title,
author, and this description to match your project!

******************/

let windowWall;

// NIGHTSKY]
let star;
// Define how many star are to be displayed
let numStars = 20;
// An empty array to store stars in
let nightSky = [];
let mainCanvas;

// preload()
//
// Load assets before the game starts
function preload() {
  //windowWall = loadImage("assets/images/window.png");
}


// setup()
//
// Description of setup

function setup() {

  mainCanvas = createCanvas(500, 600);
  console.log("ok");
  // NIGHTSKY
  // Set the initial position and properties of the stars
  /*for (let i = 0; numStars; i++) {
    // Generate (mostly) random values for the arguments of the NightSky constructor
    let starX = random(100, 400);
    let starY = random(0, height);
    let starRadius = random(1, 3);
    let nightX = width / 2;
    let nightY = height / 2;
    let nightWidth = width;
    let nightHeight = height;
    // Create a new NightSky object with the random values
    //let newStar = new NightSky(starX, starY, starRadius, nightX, nightY, nightWidth, nightHeight);
    // Add the new star to the array
    //nightSky.push(newStar);
  }
  */

  // This image truly act as a wall to separate the outside
  // from the inside. The image is transparent to create the effect of a window.
  //push();
  //imageMode(CENTER);
  //image(windowWall, width / 2, height / 2);
  //pop();
}


// draw()
//
// Description of draw()

function draw() {
  // Update background as the game runs
  background(220);
  alert("Updating ");

  // Display the nightSky
  //for (let i = 0; i < numStars; i++) {
  //nightSky[i].display();
  //nightSky[i].reduceSize();
  //}

  // // Update the wall background as the game runs
  // push();
  // imageMode(CENTER);
  // image(windowWall, width / 2, height / 2);
  // pop();
}