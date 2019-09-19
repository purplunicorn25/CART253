// Exercise 1 - Movement
// Anne Boutet
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

// Image already set to canvas size: 640 X 640
let movingImage;
//Image location
let imageX = -640;
let imageY = 0;
// Obect that follows the mouse
let mouseShadow;
let scale = -0.5;
// Other moving image
let movingImage2;
let scale2 = -0.6;
let image2X = 640;
let image2Y = -200;


// preload movingImage and mouseShadow

function preload() {
  movingImage = loadImage("images/Forest.jpg");
  // Always make the path from where the index.html file is
  mouseShadow = loadImage("images/butterfly.png");
  movingImage2 = loadImage("images/Unicorn.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();
}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {
  // We don't fill the background so we get a drawing effect

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

  // Make movingImage move from left to right
  imageMode(CORNER)
  imageX = imageX + 1;
  image(movingImage, imageX, imageY);

  // Make mouseShadow follow the mouse position
  image(mouseShadow, mouseX, mouseY, mouseShadow.width * scale, mouseShadow.height * scale);

  // Make the movingImage 2 rotate PI/4
  imageMode(CENTER);
  image2X = image2X - 1;
  image2Y = image2Y + 1;
  image(movingImage2, image2X, image2Y, movingImage2.width * scale2, movingImage2.height * scale2);
}
