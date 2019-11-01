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
  constructor(x, y, speed, avatar, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Speed
    this.speed = speed;
    // Display properties
    this.avatar = avatar;
  }

  // move
  //
  // Updates the position at a constant pace
  // Only moves from side-ways
  move() {
    this.x += speed;
  }

  // display
  //
  // Use an image to display the obstacle
  display() {
    image(this.avatar, this.x, this.y);
  }