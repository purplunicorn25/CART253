// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow s and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;

// The three prey
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predators and the preys
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Predators
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW); // Arrow keys
  panther = new Predator(100, 100, 5, color(155, 0, 200), 40, 87, 83, 65, 68); // WSAD keys
  koala = new Predator(100, 100, 5, color(100, 100, 0), 40, 73, 75, 74, 76); // IKJL keys

  // Preys
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 150); //50
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 120); //60
  bee = new Prey(100, 100, 20, color(255, 255, 0), 30); //10
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the the predators
  tiger.handleInput();
  panther.handleInput();
  koala.handleInput();

  // Move all the "animals"
  tiger.move();
  panther.move();
  koala.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the predators eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);
  panther.handleEating(antelope);
  panther.handleEating(zebra);
  panther.handleEating(bee);
  koala.handleEating(antelope);
  koala.handleEating(zebra);
  koala.handleEating(bee);

  // Keep track of each Predator's Score
  tiger.scorePredator(antelope);
  tiger.scorePredator(zebra);
  tiger.scorePredator(bee);
  panther.scorePredator(antelope);
  panther.scorePredator(zebra);
  panther.scorePredator(bee);
  koala.scorePredator(antelope);
  koala.scorePredator(zebra);
  koala.scorePredator(bee);

  console.log(koala.score + " tiger's score");

  // Display all the "animals"
  tiger.display();
  panther.display();
  koala.display();
  antelope.display();
  zebra.display();
  bee.display();
}