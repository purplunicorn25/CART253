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


// setup()
//
// Description of setup
let circleX;
let circleY;
let circleSize = 100;
function setup() {
  createCanvas(500,500);
  circleX = width/2;
  circleY = height/2;
}
function draw() {
  background(255);
  let d = dist(mouseX,mouseY,circleX,circleY);
  if (d < circleSize/8) {
    fill(255,0,0);
  }
  else {
    fill(255);
  }
  ellipse(circleX,circleY,circleSize,circleSize);
}
