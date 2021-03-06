// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.
// It rotates as it moves to render a genuine wind effect

class Prey {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, avatar) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Display properties
    this.avatar = avatar;
    this.initialWidth = 38;
    this.width = this.initialWidth; // 38px is the initial size of the images
    this.height = this.width;
    this.caught = false;
    // Rotation properties
    this.theta = 0;
    this.velTheta = random(0.01, 0.03);
  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the prey has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // display
  //
  // Draw the prey with an image (avatar)
  display() {
    // Use images to display the Preys
    // Make sure that the X and Y are in the center of the images
    // Rotate the images to give them a more natural windy behavior
    if (this.caught === false) {
      push();
      imageMode(CENTER);
      translate(this.x, this.y);
      this.theta += this.velTheta;
      rotate(this.theta);
      image(this.avatar, 0, 0, this.width, this.height);
      pop();
    }
  }

  // reset
  //
  // Reset the width of the prey so that they look as new preys
  reset() {
    this.width = this.initialWidth;
    this.height = this.width;
  }
}