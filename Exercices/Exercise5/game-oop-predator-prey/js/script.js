// Predator-Prey Simulation
// by Pippin Barr
// &
// Anne Boutet
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow s and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predators and their avatars
let tiger;
let tigerAvatar;
let shark;
let sharkAvatar;
let alligator;
let alligatorAvatar;

// The preys and their avatars
let boar;
let boarAvatar;
let fish;
let fishAvatar;
let sheep;
let sheepAvatar;

let leftbackground;
let middlebackgroud;
let rightbackground;

// preload()
//
// Load assets before the game starts
function preload() {
  // Load all the  avatars
  tigerAvatar = loadImage("assets/images/Tiger.png");
  sharkAvatar = loadImage("assets/images/Shark.png");
  alligatorAvatar = loadImage("assets/images/Alli.png");
  boarAvatar = loadImage("assets/images/Boar.png");
  fishAvatar = loadImage("assets/images/Fish.png");
  sheepAvatar = loadImage("assets/images/Sheep.png");
}
// setup()
//
// Sets up a canvas
// Creates objects for the predators and the preys
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Setup the divided background all white at the start
  backgroundSetup();

  // (speed, image(avatar, x, y, radius, radius), upKey, downKey, leftKey, rightKey, sprintKey, scoreX, scoreY, scoreChangeRed, scoreChangeGreen, scoreChangeBlue)
  // Predators
  tiger = new Predator(width * 1 / 6, 100, 5, tigerAvatar, 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, CONTROL, 0, 0, 0, -25.5, -25.5); // Arrow keys Sprint = CTRL
  shark = new Predator(width / 2, 100, 5, sharkAvatar, 40, 87, 83, 65, 68, SHIFT, width * 1 / 3, 0, -25.5, -25.5, 0); // WSAD keys Sprint = SHIFT
  alligator = new Predator(width * 5 / 6, 100, 5, alligatorAvatar, 40, 73, 75, 74, 76, 32, width * 2 / 3, 0, -25.5, 0, -25.5); // IKJL keys Sprint = SPACE

  // Preys
  boar = new Prey(100, 100, 8, boarAvatar, 120); //50
  fish = new Prey(100, 100, 12, fishAvatar, 40); //60
  sheep = new Prey(100, 100, 3, sheepAvatar, 70); //10
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // The score is displayed with three backgroud changing colors
  tiger.scoreDisplay();
  shark.scoreDisplay();
  alligator.scoreDisplay();


  // Handle input for the the predators
  tiger.handleInput();
  shark.handleInput();
  alligator.handleInput();

  // Move all the "animals"
  tiger.move();
  shark.move();
  alligator.move();
  boar.move();
  fish.move();
  sheep.move();

  // Handle the predators eating any of the prey
  tiger.handleEating(boar);
  tiger.handleEating(fish);
  tiger.handleEating(sheep);
  shark.handleEating(boar);
  shark.handleEating(fish);
  shark.handleEating(sheep);
  alligator.handleEating(boar);
  alligator.handleEating(fish);
  alligator.handleEating(sheep);

  // Display all the "animals"
  tiger.display();
  shark.display();
  alligator.display();
  boar.display();
  fish.display();
  sheep.display();
}

// backgroundSetup()
//
// Divide the screen in three rectangles (at first white)
function backgroundSetup() {
  fill(255);
  noStroke();
  rect(0, 0, width, height);
}