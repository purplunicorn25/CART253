/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let tiger; // This will contain our Predator object
let deadlyMoth;
let antilope;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(0, 0, 5, color(255, 0, 0), 25);
  deadlyMoth = new Predator(width / 2, height / 2, 1, color(200, 200, 100), 100);
  antelope = new Prey(300, 300, 10, color(255), 40);
}

function draw() {
  background(0);

  //Predator
  tiger.handleInput();
  deadlyMoth.handleInput();

  tiger.move();
  deadlyMoth.move();

  tiger.display();
  deadlyMoth.display();

  tiger.handleEating(antelope);
  deadl.handleEating(antelope);

  //Prey
  antelope.handleInput();

  antelope.move();

  antelope.display();
}