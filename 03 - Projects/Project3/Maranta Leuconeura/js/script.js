/*****************

The (Secret) Journey of a Maranta Leuconeura
Anne Boutet

This is a PROTOTYPE. You must fill in the title,
author, and this description to match your project!

******************/

let windowImage;

// preload()
//
// Load assets before the game starts
function preload() {
  windowImage = loadImage("assets/images/window.png");
}


// setup()
//
// Description of setup

function setup() {
  createCanvas(500, 600);
  background(0);

  // This image truly act as a wall to separate the outside
  // from the inside
  imageMode(CENTER);
  image(windowImage, width / 2, height / 2);


}


// draw()
//
// Description of draw()

function draw() {
  fill(0);
  rect(100, 100, 100, 100);
}