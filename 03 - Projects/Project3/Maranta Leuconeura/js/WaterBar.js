// WaterBar
//
// That class displays how much water has been collected.
// The player.score is changing the height of the bar.

class WaterBar {

  // constructor
  //
  // Set the initial values for the WaterBar's properties
  // Either sets default values or uses arguments provided
  constructor(lowX, lowY, highX, highY, width, maxHeight, color) {
    // Position properties
    this.lowX = lowX;
    this.lowY = lowY;
    this.highX = highX;
    this.highY = highY;
    // Display properties
    this.width = width;
    this.height;
    this.maxHeight = maxHeight;
    this.fill = color;
  }

  // display
  //
  // Display the bar as a rectangle with round egde
  display() {
    push();
    rectMode(CORNERS);
    fill(this.fill);
    noStroke();
    rect(this.highX, this.highY, this.lowX, this.lowY);
    pop();
  }

  // handleScore
  //
  // The size of the rectangle is linked to the player.score
  handleScore(player) {
    if (player.scoring === true) {
      this.highY = this.highY - player.score / 300; // adjust the rate to the size of the bar
      this.highY = constrain(this.highY, this.maxHeight, this.lowY);
      player.scoring = false;
    }
  }
}