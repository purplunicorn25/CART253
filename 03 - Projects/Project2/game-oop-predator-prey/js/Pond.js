// Pond
//
// A class that displays a pond object
// when Decoration objects are displayed
class Pond {

  // constructor
  // Set the initial values for the pond properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, avatar) {
    // Position
    this.x = x;
    this.y = y;
    // Display properties
    this.avatar = avatar;
  }

  // reset
  //
  // reset the pond x an y
  reset() {
    this.x = random(0, width);
    this.y = random(0, height);
  }

  // display
  //
  // Draw the pond with an image
  display() {
    push();
    imageMode(CENTER);
    image(this.avatar, this.x, this.y);
    pop();
  }
}