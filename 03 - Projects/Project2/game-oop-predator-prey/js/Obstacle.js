// Obstacle
//
// A class that represents a simple obstacle
// moving side ways accross the canvas
// that the Predator must avoid.

class Obstacle {

  // constructor
  //
  // Sets the initial values for the Obstacle's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, avatar) {
    // Position
    this.x = x;
    this.y = y;
    this.xOffScreen = false;
    this.OffScreenRight = 1000;
    this.OffScreenLeft = -400;
    // Speed
    this.speed = speed;
    this.vx = 0;
    // Display properties
    this.avatar = avatar;
    this.size = 88; // same as the predator
    this.width = this.size;

    this.obstacleOffScreen = false;

  }

  // move
  //
  // Updates the position at a constant pace
  // Only moves from side-ways
  move() {
    this.vx = this.speed;
    this.x += this.vx;
  }

  // display
  //
  // Use an image to display the obstacle
  display() {
    push();
    imageMode(CENTER);
    image(this.avatar, this.x, this.y, this.size, this.size);
    pop();
  }

  // offScreen
  //
  // Check if walker is off screen
  offScreen() {
    if (this.x > this.OffScreenRight) {
      return true;
    }
    return false;
  }

  // reset
  //
  // Reset walkers positions
  reset() {
    if (this.obstacleOffScreen === true) {
      fill(0);
      rect(200, 200, 200, 200)
    }
  }
}