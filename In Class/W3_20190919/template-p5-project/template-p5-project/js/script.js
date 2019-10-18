/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

function preload() {

}


let x = 0;
let y = 0;
let speed = 5;
let vx = 40;
let ax = 0.5; // Acceleration
function setup() {
  createCanvas(500,500);
  x = width/2;
  y = height/2;
  vx = speed;
}
function draw() {
  // Change velocity based on acceleration
  vx = vx + ax;
  // Change position based on velocity
  x = x + vx;
  ellipse(x,y,50,50);
}
