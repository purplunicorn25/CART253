// Player
//
// That class allows the player to collect water,
// water the plant when the bar is filled,
// and to draw a secret drawing only displayed at the end.

class Player {

  // constructor
  //
  // Set the initial values for the Player's properties
  // Either sets default values or uses arguments provided
  constructor(avatar, width) {
    // Position properties
    this.x;
    this.y;
    // Display properties
    this.width = width;
    this.height = this.width;
    this.avatar = avatar;
    // Interactive properties
    this.collectingRate = .2;
  }

  // display
  //
  // Set an image to be the mouse avatar
  display() {
    push();
    imageMode(CENTER);
    this.x = mouseX;
    this.y = mouseY;
    image(this.avatar, this.x, this.y, this.width, this.height);
    pop();
  }

  // handleCollecting
  //
  // Take a humidity object as an argument and check if the player
  // overlaps it. If so, increase the water level. If the humidity object's
  // radius is === 0.5, it resets.
  handleCollecting(humidity) {
    // Calculate distance from this player to this humidity
    let d = dist(this.x, this.y, humidity.x, humidity.y);
    // Check if the distance is less than the humidity's radius
    if (d < this.width / 4 + humidity.radius) {
      // Decrease humidity's radius when overlap
      humidity.radius -= this.collectingRate;
    }
  }

}