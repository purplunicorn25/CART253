"use strict";

// Predator-Prey Simulation
// by Pippin Barr
// &
// Anne Boutet
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

////////////////////
// NO ERRORS IN HERE
////////////////////

// Our predator
let tiger;
// The three prey
// fixed "e"
let antelope;
// fixed
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
// fixed space
function setup() {
  // fixed
  createCanvas(windowWidth, windowHeight);
  // (x, y, speed, fillColor, radius)
  // fixed ","
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40);
  // fixed
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  // fixed y
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  // fixed
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  // fixed "d"
  background(0);
  // fixed

  // Handle input for the tiger
  // fixed
  tiger.handleInput();
  // fixed

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  // fixed
  bee.move();
  // fixed


  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  // fixed "e"
  antelope.display();
  // fixed
  // fixed "a"
  zebra.display();
  // fixed
  // fixed "ee"
  bee.display();
  // fixed
}