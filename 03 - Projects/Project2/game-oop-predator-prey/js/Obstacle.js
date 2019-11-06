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
    this.xOffScreen = random(1100, 1300);
    // Speed
    this.speed = speed;
    // Display properties
    this.avatar = avatar;
    this.size = 88; // same as the predator
    this.width = this.size;
  }

  // move
  //
  // Updates the position at a constant pace
  // Only moves from side-ways
  move() {
    this.x += this.speed;
  }

  // display
  //
  // Use an image to display the obstacle
  display() {
    image(this.avatar, this.x, this.y, this.size, this.size);
  }

  // reset
  //
  // Reset the prey's X and Y when it is off screen
  reset() {
    if (this.x > this.xOffScreen) {

    }
  }
}